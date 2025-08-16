#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 SUGGESTLY ELITE - Ultra Premium Build Process');
console.log('================================================');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('✅ Created dist directory');
}

// Copy main HTML files
const htmlFiles = [
  'index.html',
  'ultra-cutting-edge.html',
  'homepage-view.html',
  'homepage-preview.html'
];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`✅ Copied ${file}`);
  }
});

// Copy static assets
const staticDirs = ['public', 'src/assets'];
staticDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    // Use cross-platform copy
    const copyDir = (src, dest) => {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const items = fs.readdirSync(src);
      items.forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        if (fs.statSync(srcPath).isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      });
    };
    copyDir(dir, path.join(distDir, dir));
    console.log(`✅ Copied ${dir}`);
  }
});

// Copy CSS files
const cssFiles = ['styles.css'];
cssFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`✅ Copied ${file}`);
  }
});

// Copy JS files
const jsFiles = ['app.js', 'server.js'];
jsFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`✅ Copied ${file}`);
  }
});

// Copy configuration files
const configFiles = [
  'package.json',
  'vercel.json',
  'netlify.toml',
  'firebase.json',
  'railway.json',
  'manifest.json',
  'sw.js'
];

configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`✅ Copied ${file}`);
  }
});

// Create _redirects for Netlify
const redirectsContent = `/*    /index.html   200`;
fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent);
console.log('✅ Created _redirects for Netlify');

// Create _headers for Netlify
const headersContent = `/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https: wss:; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';`;
fs.writeFileSync(path.join(distDir, '_headers'), headersContent);
console.log('✅ Created _headers for Netlify');

// Create robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: https://suggestlyelite.com/sitemap.xml`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent);
console.log('✅ Created robots.txt');

// Create sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://suggestlyelite.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://suggestlyelite.com/ultra-cutting-edge.html</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://suggestlyelite.com/homepage-view.html</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
console.log('✅ Created sitemap.xml');

// Create runtime-config.json for production
const runtimeConfig = {
  wsUrl: process.env.VITE_LIVE_FEED_URL || "wss://live.suggestlyelite.com/ws",
  apiOrigin: process.env.VITE_API_ORIGIN || "https://api.suggestlyelite.com",
  heroVideo: process.env.HERO_VIDEO || "https://assets.suggestlyelite.com/hero.mp4",
  heroPoster: process.env.HERO_POSTER || "https://assets.suggestlyelite.com/hero-poster.jpg"
};
fs.writeFileSync(path.join(distDir, 'runtime-config.json'), JSON.stringify(runtimeConfig, null, 2));
console.log('✅ Created runtime-config.json');

console.log('\n🎉 Build completed successfully!');
console.log('📁 Output directory: dist/');
console.log('🚀 Ready for deployment to all services!');
