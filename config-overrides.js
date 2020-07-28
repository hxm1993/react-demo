
const { override, addDecoratorsLegacy, addLessLoader } = require("customize-cra");
module.exports = override(
      addDecoratorsLegacy(),
      addLessLoader({
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#1DA57A' },
      }),
)