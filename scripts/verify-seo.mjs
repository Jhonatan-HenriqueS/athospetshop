import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

// Exercise the actual TypeScript modules in isolated environment configurations.
function loadModule(path, env, cache = new Map()) {
  if (cache.has(path)) return cache.get(path);
  const source = fs.readFileSync(path, 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {}; cache.set(path, exports);
  const require = name => {
    if (!name.startsWith('@/')) throw new Error(`Unexpected runtime dependency: ${name}`);
    return loadModule(`${name.slice(2)}.ts`, env, cache);
  };
  vm.runInNewContext(output, { exports, require, process: { env }, URL }, { filename: path });
  return exports;
}
const fixtureOrigin = 'https://www.openai.com'; // Real origin used only in isolated tests, never site config.
const preview = loadModule('lib/seo.ts', {});
for (const input of [undefined, '', 'http://localhost:3000', 'https://example.com', 'https://127.0.0.1', 'https://test.invalid', 'https://user:pass@host.com', `${fixtureOrigin}/path`, `${fixtureOrigin}?x=1`]) {
  assert.equal(preview.getSiteUrl(input), undefined, `Reject invalid production origin ${input}`);
}
assert.equal(preview.pageMetadata('/').alternates, undefined);
assert.equal(preview.indexable, false);
for (const [env, expected] of [
  [{SITE_URL:fixtureOrigin,SITE_INDEXABLE:'true',NODE_ENV:'production'},true],
  [{SITE_URL:fixtureOrigin,SITE_INDEXABLE:'false',NODE_ENV:'production'},false],
  [{SITE_URL:fixtureOrigin,SITE_INDEXABLE:'true',NODE_ENV:'development'},false],
  [{SITE_URL:fixtureOrigin,SITE_INDEXABLE:'true',NODE_ENV:'production',VERCEL_ENV:'preview'},false],
  [{SITE_INDEXABLE:'true',NODE_ENV:'production'},false],
]) {
  const seo=loadModule('lib/seo.ts',env);
  assert.equal(seo.indexable,expected);
  const sitemap=loadModule('app/sitemap.ts',env).default();
  assert.equal(sitemap.length,expected?2:0);
  const robots=loadModule('app/robots.ts',env).default();
  assert.equal(robots.rules.allow,'/');
  assert.equal(Boolean(robots.sitemap),expected);
  if(expected){
    assert.equal(seo.pageMetadata('/privacidade').alternates.canonical,`${fixtureOrigin}/privacidade`);
    assert.equal(seo.businessSchema()['@id'],`${fixtureOrigin}/#athos`);
    assert.equal(seo.businessSchema().address.streetAddress,'Rua Monte Castelo, 452, Jardim dos Migrantes');
  }
}
console.log('PASS SEO: no-domain preview, invalid origins, production opt-in, development, hosted previews, route canonicals, robots, sitemap and business schema.');
