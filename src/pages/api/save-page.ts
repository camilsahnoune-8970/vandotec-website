import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { simpleGit } from 'simple-git';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({ ok: true, method: 'POST', message: 'Gebruik POST om een pagina op te slaan.' }),
    { headers: { 'content-type': 'application/json' } }
  );
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const slug = String(form.get('slug') || '').trim();
    const content = String(form.get('content') || '');

    const allowed = ['home', 'contact', 'expertises', 'jobs', 'over-vandotec', 'service-onderhoud'];
    if (!allowed.includes(slug)) {
      return new Response(JSON.stringify({ ok: false, error: 'Ongeldige pagina.' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: 'JSON is niet geldig.' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const filePath = join(process.cwd(), `src/data/${slug}.json`);
    writeFileSync(filePath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf-8');

    const git = simpleGit(process.cwd());
    const status = await git.status();
    let commitMessage = `chore: update ${slug} via admin`;
    let pushed = false;
    if (status.files.length) {
      await git.add(`src/data/${slug}.json`);
      await git.commit(commitMessage);
      const remote = (await git.listRemotes()).find((r) => r.name === 'origin');
      if (remote) {
        await git.push('origin', 'main');
        pushed = true;
      }
    }

    return new Response(JSON.stringify({ ok: true, saved: true, commitMessage, pushed }), { headers: { 'content-type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : 'Onbekende fout' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};
