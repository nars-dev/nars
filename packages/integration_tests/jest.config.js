module.exports = {
  preset: "ts-jest",
  globals: {
    __DEV__: true,
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
