const fs = require('fs');
const path = require('path');

const themeDir = path.join(__dirname, 'theme');
const sourceDir = path.join(__dirname, 'source');

// Directories/files to sync
const syncPaths = [
  { from: '*.html', type: 'files' },
  { from: 'js', type: 'directory' },
  { from: 'images', type: 'directory' },
  { from: 'plugins', type: 'directory' }
];

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${path.relative(__dirname, src)} -> ${path.relative(__dirname, dest)}`);
}

function copyDirectory(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.log(`Source directory does not exist: ${srcDir}`);
    return;
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);

  files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
}

function syncHTMLFiles() {
  const htmlFiles = fs.readdirSync(themeDir).filter(file => file.endsWith('.html'));
  
  htmlFiles.forEach(file => {
    const srcPath = path.join(themeDir, file);
    const destPath = path.join(sourceDir, file);
    copyFile(srcPath, destPath);
  });
}

// Sync HTML files
console.log('Syncing HTML files...');
syncHTMLFiles();

// Sync JS directory
console.log('\nSyncing JS directory...');
copyDirectory(path.join(themeDir, 'js'), path.join(sourceDir, 'js'));

// Sync images directory
console.log('\nSyncing images directory...');
copyDirectory(path.join(themeDir, 'images'), path.join(sourceDir, 'images'));

// Sync plugins directory
console.log('\nSyncing plugins directory...');
copyDirectory(path.join(themeDir, 'plugins'), path.join(sourceDir, 'plugins'));

console.log('\n✅ Sync complete! All changes from theme folder have been synced to source folder.');

