import type { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = 'https://suggestlyg4plus.io';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const content = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(content);
}


