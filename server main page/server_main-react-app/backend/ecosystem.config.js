// filepath: /home/koa/Downloads/git/personal-server-mainpage/server main page/server_main-react-app/backend/ecosystem.config.js
module.exports = {
  apps: [{
    name: 'xross-backend',
    script: 'server.js',
    env_file: '.env',  // backend 디렉토리에 있는 .env 파일을 사용
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
