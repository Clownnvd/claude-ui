const fs = require('fs');
const path = require('path');

function patchFile(filePath, patches) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let patched = false;

    for (const { target, replacement } of patches) {
      if (content.includes(target) && !content.includes(replacement)) {
        content = content.replace(target, replacement);
        patched = true;
      }
    }

    if (patched) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Patched ${path.basename(filePath)} successfully`);
    } else {
      console.log(`${path.basename(filePath)} already patched or target not found`);
    }
  } catch (err) {
    console.log(`Skipping ${path.basename(filePath)}:`, err.message);
  }
}

// Patch 1: Fix generate-build-id.js - generate may not be a function
patchFile(
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'build', 'generate-build-id.js'),
  [{
    target: 'let buildId = await generate()',
    replacement: 'let buildId = typeof generate === "function" ? await generate() : null'
  }]
);

// Patch 2: Fix SWC options.js - useCacheEnabled and cacheComponentsEnabled must not be undefined
// The SWC Rust binary requires these fields; JSON.stringify drops undefined values causing deserialization failure
patchFile(
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'build', 'swc', 'options.js'),
  [
    {
      target: 'cacheComponentsEnabled: isCacheComponents,',
      replacement: 'cacheComponentsEnabled: isCacheComponents ?? false,'
    },
    {
      target: 'useCacheEnabled\n        } : undefined,\n        serverActions',
      replacement: 'useCacheEnabled: useCacheEnabled ?? false\n        } : undefined,\n        serverActions'
    },
    {
      target: 'useCacheEnabled,\n            hashSalt',
      replacement: 'useCacheEnabled: useCacheEnabled ?? false,\n            hashSalt'
    }
  ]
);
