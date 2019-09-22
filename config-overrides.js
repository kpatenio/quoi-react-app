const { override, fixBabelImports, addLessLoader } = require('customize-cra');


module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // 'css' or true (with addLessLoader)
    }),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#1DA57A' },
    }),
);