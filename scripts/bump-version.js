'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const publicDir = path.join(rootDir, 'public');
const srcDir = path.join(rootDir, 'src');

// 1. Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// 2. Determine bump type: 'patch' (default), 'minor', 'major', or 'build-only'
const bumpType = process.argv[2] || 'patch';

const currentVersion = (packageJson.version || '0.1.0').split('-')[0];
const parts = currentVersion.split('.').map(n => parseInt(n, 10) || 0);
while (parts.length < 3) parts.push(0);

if (bumpType === 'major') {
  parts[0] += 1;
  parts[1] = 0;
  parts[2] = 0;
} else if (bumpType === 'minor') {
  parts[1] += 1;
  parts[2] = 0;
} else if (bumpType === 'patch') {
  parts[2] += 1;
}

const bumpedVersion = parts.join('.');

// 3. Increment sequential build number
const currentBuildNumber = typeof packageJson.buildNumber === 'number' ? packageJson.buildNumber : 0;
const newBuildNumber = currentBuildNumber + 1;

// 4. Generate random build hash (6-character alphanumeric string)
const randomHash = crypto.randomBytes(3).toString('hex');

// 5. Build timestamps and full version string
const buildTime = new Date().toISOString();
const fullVersion = `${bumpedVersion}.${newBuildNumber}-${randomHash}`;

// 6. Update package.json
packageJson.version = bumpedVersion;
packageJson.buildNumber = newBuildNumber;
packageJson.buildHash = randomHash;
packageJson.buildTime = buildTime;
packageJson.fullVersion = fullVersion;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');

// 7. Prepare version payload
const versionData = {
  version: bumpedVersion,
  buildNumber: newBuildNumber,
  buildHash: randomHash,
  fullVersion: fullVersion,
  builtAt: buildTime,
};

// 8. Write public/version.json (served as static endpoint for live client updates)
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(
  path.join(publicDir, 'version.json'),
  JSON.stringify(versionData, null, 2) + '\n',
  'utf8'
);

// 9. Write src/version.json (imported statically by React bundle)
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}
fs.writeFileSync(
  path.join(srcDir, 'version.json'),
  JSON.stringify(versionData, null, 2) + '\n',
  'utf8'
);

// 10. Update .env with REACT_APP_ environment variables
const envPath = path.join(rootDir, '.env');
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

const envVars = {
  REACT_APP_VERSION: fullVersion,
  REACT_APP_BUILD_HASH: randomHash,
  REACT_APP_BUILD_NUMBER: String(newBuildNumber),
  REACT_APP_BUILD_TIME: buildTime,
};

let updatedEnv = envContent;
for (const [key, val] of Object.entries(envVars)) {
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(updatedEnv)) {
    updatedEnv = updatedEnv.replace(regex, `${key}=${val}`);
  } else {
    updatedEnv = `${updatedEnv.trim()}\n${key}=${val}\n`.trimStart();
  }
}
fs.writeFileSync(envPath, updatedEnv, 'utf8');

console.log('==================================================');
console.log(`🚀 [Auto-Version] Build Version Bumped Successfully!`);
console.log(`   • Full Version:  ${fullVersion}`);
console.log(`   • Version:       ${bumpedVersion}`);
console.log(`   • Build Number:  #${newBuildNumber}`);
console.log(`   • Random Hash:   ${randomHash}`);
console.log(`   • Build Time:    ${buildTime}`);
console.log('==================================================');
