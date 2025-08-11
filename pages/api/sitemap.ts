import type { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://suggestlyg4plus.io';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const urls = [
    '',
    '/aurum-private',
    '/suggestly-ai',
    '/suggestly-ai/docs',
    '/suggestly-ai/api',
    '/suggestly-ai/examples',
    '/elite-tier',
    '/premium-tier',
    '/ultimate-tier',
    '/certificates',
    '/contact',
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map((path) => `\n  <url><loc>${SITE_URL}${path}</loc></url>`)
      .join('') +
    `\n</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(body);
}


