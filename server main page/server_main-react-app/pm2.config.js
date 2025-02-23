module.exports = {
  apps: [{
    name: "backend",
    script: "./backend/server.js", // 백엔드 서버 스크립트 경로
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
};
