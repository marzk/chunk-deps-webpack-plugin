const url = require('url');
const Entrypoint = require('webpack/lib/Entrypoint');

const staticManifest = {};

function identity(i) {
  return i;
}

class ChunkDepsPlugin {
  constructor(opts) {
    opts = opts ? opts : {};
    this.fileName = opts.fileName || 'chunk-manifest.json';
    this.cache = opts.cache || staticManifest;
    this.cb = opts.cb || identity;
  }

  apply(compiler) {
    const fileName = this.fileName;
    const cache = this.cache;
    const publicPath = compiler.options.output.publicPath;
    const cb = this.cb;
    compiler.hooks.emit.tapAsync('ChunkDepsPlugin', (compilation, callback) => {
      compilation.chunkGroups.forEach(chunkGroup => {
        if (!(chunkGroup instanceof Entrypoint)) {
          return;
        }
        const files = [];
        chunkGroup.chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            if (/\.(?:js|css)($|\?)/.test(file)) {
              files.push(url.resolve(publicPath || '', file));
            }
          });
        });

        const js = files.filter(file => /\.js($|\?)/.test(file));
        const css = files.filter(file => /\.css($|\?)/.test(file));
        const name = chunkGroup.name || `id${chunkGroup.id}`;
        cache[name] = cb({
          js: js,
          css: css,
        });
      });

      const source = JSON.stringify(cache, null, 2);

      compilation.assets[fileName] = {
        source: function() {
          return source;
        },
        size: function() {
          return source.length;
        },
      };

      callback();
    });
  }
}

module.exports = ChunkDepsPlugin['default'] = ChunkDepsPlugin;
