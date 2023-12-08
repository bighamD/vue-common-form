class AddPrefixToSourceMapUrlPlugin {
  constructor(prefix) {
    this.prefix = prefix;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('AddPrefixToSourceMapUrlPlugin', (compilation, callback) => {
      // 遍历每个输出的文件
      Object.keys(compilation.assets).forEach(filename => {
        const asset = compilation.assets[filename];

        // 替换源文件中的 sourceMappingURL 注释
        if (asset.source() && asset.source().includes('//# sourceMappingURL')) {
          const newSource = asset.source().replace(/(\/\/# sourceMappingURL=)([^\r\n]+)$/gm, (match, p1, p2) => {
            // 将路径拼接为带有前缀的路径
            const absolutePath = new URL(p2, this.prefix).toString();
            return `${p1}${absolutePath}`;
          });

          compilation.assets[filename] = {
            source: () => newSource,
            size: () => newSource.length,
          };
        }
      });

      callback();
    });
  }
}

module.exports = AddPrefixToSourceMapUrlPlugin;
