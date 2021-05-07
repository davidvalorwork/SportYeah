module.exports = {
  apps: [
    {
      name: "challenge",
      script: "./build/challenge.js",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
