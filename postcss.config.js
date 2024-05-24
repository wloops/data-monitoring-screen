// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16, // 转换基数，设计稿一般是750或者1920，这里以16（即1rem = 16px）为例
      propList: ['*'], // 需要转换的属性，这里选择转换所有属性
    },
  },
};
