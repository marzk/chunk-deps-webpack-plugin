# Chunk Deps Webpack Plugin

Generate a manifest which contains the deps js and css about the entry.

0.x for `Webpack@^1.0 | ^2.0 | ^3.0`.
1.x for `Webpack@^4.0`.

## Install

```

npm install --dev chunk-deps-webpack-plugin

```

## Usage

```javascript

const ChunkDepsPlugin = require('chunk-deps-webpack-plugin');

new ChunkDepsPlugin({
  // generated file name
  fileName: 'chunk-manifest.json',

  // manifest cache, design for multi configs
  cache: {}

  // entry manifest
  cb(entryManifest) {
    return entryManifest;
  }
})

```

## Manifest

```json

{
  "entry": {
    "js": [],
    "css": []
  }
}

```
