import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const pages = readdirSync(root, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'tests')
  .map(entry => entry.name);

for (const page of pages) {
  const html = readFileSync(new URL(`${page}/index.html`, root), 'utf8');
  const script = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].at(-1)[1];
  test(`${page}: invalid requests do not open email; valid requests state that the visitor must send`, () => {
    assert.doesNotThrow(() => new Function(script));
    if (!html.includes('id="notify-form"')) return;
    for (const valid of [false, true]) {
      let listener;
      const links = [];
      const shown = [];
      const form = {
        addEventListener: (_, fn) => { listener = fn; },
        reportValidity: () => valid,
        querySelector: () => ({ value: ' buyer+updates@example.com ' })
      };
      const message = {
        textContent: '', appendChild: link => links.push(link), classList: { add: value => shown.push(value) }
      };
      const window = { location: { href: '' } };
      runInNewContext(script, {
        document: {
          getElementById: id => id === 'notify-form' ? form : message,
          createElement: () => ({})
        }, window
      });
      listener({ preventDefault() {} });
      if (!valid) {
        assert.equal(window.location.href, '');
        assert.deepEqual(shown, []);
      } else {
        const url = new URL(window.location.href);
        assert.equal(url.protocol, 'mailto:');
        assert.equal(url.pathname, 'support@axonring.com');
        assert.match(url.searchParams.get('subject'), new RegExp(page));
        assert.match(url.searchParams.get('body'), /buyer\+updates@example.com/);
        assert.match(message.textContent, /Send it from your email app/);
        assert.equal(links[0].href, window.location.href);
        assert.deepEqual(shown, ['show']);
      }
    }
  });
}
