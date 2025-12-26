# 📦 Ethio-Intl NPM Publishing Guide

This guide explains how to publish the Ethio-Intl SDK to npm for public consumption.

## 🔧 Prerequisites

Before publishing, ensure you have:

1. **npm Account**: Create one at [npmjs.com](https://www.npmjs.com)
2. **GitHub Repository**: Code should be in [BeamSol/Ethio-Intl](https://github.com/BeamSol/Ethio-Intl)
3. **Build Verification**: All tests pass and build succeeds
4. **Version Bumped**: Update version in `package.json` for each release

## 📋 Pre-Publishing Checklist

- [ ] Run `npm test` - All tests pass
- [ ] Run `npm run build` - Build succeeds without errors
- [ ] Run `npm run type-check` - TypeScript compilation succeeds
- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with release notes
- [ ] Verify all GitHub URLs are correct in `package.json`
- [ ] Test local installation: `npm pack && npm install -g ./ethio-intl-*.tgz`

## 🚀 Publishing Steps

### Step 1: Prepare for Release

```bash
# Ensure you're on main branch and up to date
git checkout main
git pull origin main

# Run all checks
npm run type-check
npm test
npm run build

# Update version (patch, minor, or major)
npm version patch  # 1.0.0 → 1.0.1
# npm version minor  # 1.0.0 → 1.1.0
# npm version major  # 1.0.0 → 2.0.0
```

### Step 2: Publish to npm

```bash
# Login to npm (if not already logged in)
npm login

# Dry run first (recommended)
npm publish --dry-run

# If dry run looks good, publish for real
npm publish

# Or publish with specific tag
npm publish --tag beta  # for beta releases
npm publish --tag latest  # for stable releases
```

### Step 3: Create GitHub Release

1. Go to [GitHub Releases](https://github.com/BeamSol/Ethio-Intl/releases)
2. Click "Create a new release"
3. Use the version tag (e.g., `v1.0.1`)
4. Copy release notes from `CHANGELOG.md`
5. Publish the release

### Step 4: Update Documentation

```bash
# Push the version bump commit
git push origin main --tags

# Update GitHub Pages (if using)
npm run docs:deploy  # if you have this script
```

## 📊 Package Configuration

### Key package.json Fields

```json
{
  "name": "ethio-intl",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "files": ["dist", "README.md", "LICENSE"],
  "repository": {
    "type": "git",
    "url": "https://github.com/BeamSol/Ethio-Intl.git"
  }
}
```

### Build Output Structure

```
dist/
├── index.js      # CommonJS build
├── index.mjs     # ES modules build
├── index.d.ts    # TypeScript definitions
└── types/        # Additional type definitions
```

## 🧪 Testing Package Installation

### Local Testing

```bash
# Create a test directory
mkdir test-ethio-intl
cd test-ethio-intl

# Install from local build
npm install ../path/to/ethio-intl/ethio-intl-1.0.0.tgz

# Create test file
echo "import { toEthDate, toEthNumber } from 'ethio-intl';
console.log('Ethiopian date:', toEthDate(new Date()));
console.log('Geez number:', toEthNumber(2025));" > test.js

# Run test
node test.js
```

### Remote Testing (after publish)

```bash
# Install from npm
npm install ethio-intl

# Test the installation
node -e "import { toEthDate } from 'ethio-intl'; console.log(toEthDate(new Date()));"
```

## 📈 Version Management

### Semantic Versioning

- **Patch** (`1.0.0` → `1.0.1`): Bug fixes, no breaking changes
- **Minor** (`1.0.0` → `1.1.0`): New features, backward compatible
- **Major** (`1.0.0` → `2.0.0`): Breaking changes

### Pre-release Versions

```bash
# Beta release
npm version prerelease --preid=beta
# Result: 1.0.1-beta.0

# Release candidate
npm version prerelease --preid=rc
# Result: 1.0.1-rc.0
```

## 🐛 Troubleshooting

### Common Publishing Issues

1. **"You cannot publish over the previously published versions"**
   - Solution: Bump version number in `package.json`

2. **"Cannot read property 'length' of undefined"**
   - Solution: Ensure all required fields are present in `package.json`

3. **"no such file or directory"**
   - Solution: Run `npm run build` before publishing

4. **Permission denied**
   - Solution: Use `npm login` or check npm token permissions

### Build Issues

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
npm test
```

## 📊 Post-Publish Checklist

- [ ] Package appears on [npmjs.com/package/ethio-intl](https://www.npmjs.com/package/ethio-intl)
- [ ] GitHub release created with proper tags
- [ ] Documentation updated with new version
- [ ] Demo site updated (if applicable)
- [ ] Social media announcement posted
- [ ] Changelog updated

## 🎯 Distribution Channels

### Primary
- **npm**: Main distribution channel
- **GitHub**: Source code and issues
- **Demo Site**: Live examples

### Secondary
- **Social Media**: Twitter, LinkedIn, Instagram
- **Dev Communities**: Reddit (r/javascript, r/reactjs, r/Ethiopian)
- **Blogs**: Tech blogs and Ethiopian developer blogs

## 📞 Support

For publishing issues:
1. Check npm logs: `npm publish --verbose`
2. Verify package.json: `npm pack && tar -tf ethio-intl-*.tgz`
3. Test locally first: `npm install ./ethio-intl-*.tgz`

---

## 🚀 Quick Publish Command

```bash
# One-liner for patch releases
npm version patch && npm run build && npm test && npm publish
```

**Remember**: Always test locally before publishing to npm!


