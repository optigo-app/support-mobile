'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const publicDir = path.join(rootDir, 'public');
const versionJsonPath = path.join(publicDir, 'version.json');
const buildVersionJsonPath = path.join(buildDir, 'version.json');

if (!fs.existsSync(buildDir)) {
  console.log('[Post-Build] Build directory does not exist. Skipping post-build.');
  process.exit(0);
}

// 1. Read version data
let versionData = { fullVersion: Date.now().toString() };
if (fs.existsSync(versionJsonPath)) {
  try {
    versionData = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));
  } catch (err) {
    console.warn('[Post-Build] Could not parse version.json:', err.message);
  }
}

// 2. Ensure build/version.json exists
fs.writeFileSync(buildVersionJsonPath, JSON.stringify(versionData, null, 2) + '\n', 'utf8');

const vTag = `v=${encodeURIComponent(versionData.fullVersion || versionData.buildHash || Date.now())}`;

// 3. Helper to inject cache busters into HTML/ASPX files
function processHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace or append ?v= to script src
  content = content.replace(/(<script\b[^>]*?\bsrc=["'])([^"']+?)(["'][^>]*?>)/gi, (match, prefix, src, suffix) => {
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
      return match;
    }
    const cleanSrc = src.replace(/[?&]v=[^&"']*/, '');
    const sep = cleanSrc.includes('?') ? '&' : '?';
    return `${prefix}${cleanSrc}${sep}${vTag}${suffix}`;
  });

  // Replace or append ?v= to stylesheet href
  content = content.replace(/(<link\b[^>]*?\bhref=["'])([^"']+?)(["'][^>]*?>)/gi, (match, prefix, href, suffix) => {
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
      return match;
    }
    // Only target css files or icons
    if (!href.includes('.css') && !href.includes('manifest.json')) {
      return match;
    }
    const cleanHref = href.replace(/[?&]v=[^&"']*/, '');
    const sep = cleanHref.includes('?') ? '&' : '?';
    return `${prefix}${cleanHref}${sep}${vTag}${suffix}`;
  });

  // Update or insert anti-cache meta tags
  if (!content.includes('http-equiv="Cache-Control"')) {
    const metaBlock = `
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta name="app-version" content="${versionData.fullVersion || ''}" />
    <meta name="build-time" content="${versionData.builtAt || ''}" />`;

    if (content.includes('<head>')) {
      content = content.replace('<head>', `<head>${metaBlock}`);
    } else if (content.includes('<head runat="server">')) {
      content = content.replace('<head runat="server">', `<head runat="server">${metaBlock}`);
    }
  } else {
    // Update existing version meta tags
    content = content.replace(/<meta\s+name=["']app-version["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="app-version" content="${versionData.fullVersion || ''}" />`);
    content = content.replace(/<meta\s+name=["']build-time["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="build-time" content="${versionData.builtAt || ''}" />`);
  }

  // Add or update build stamp comment at the top
  const stamp = `<!-- Build Version: ${versionData.fullVersion || ''} | Timestamp: ${versionData.builtAt || ''} -->\n`;
  if (content.startsWith('<!-- Build Version:')) {
    content = content.replace(/^<!-- Build Version: [^\n]* -->\n/i, stamp);
  } else {
    content = stamp + content;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[Post-Build] Cache busters applied to: ${path.relative(rootDir, filePath)}`);
}

// Process index.html and Home.aspx if they exist in build/
processHtmlFile(path.join(buildDir, 'index.html'));
processHtmlFile(path.join(buildDir, 'Home.aspx'));

console.log('==================================================');
console.log(`✅ [Post-Build] Build files stamped with ?${vTag}`);
console.log(`   • Version file copied to: build/version.json`);
console.log('==================================================');
