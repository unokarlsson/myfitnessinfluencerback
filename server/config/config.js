const env = process.env.NODE_ENV || 'dev';
console.log(`env = ${env}`);

if(env==='dev' || env==='test' || env==='docker-dev'|| env==='docker-test') {
    // Staging and production do not enter!
    const config    = require('./config.json');
    const envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

// console.log(`process.env.HTTP_PORT     = ${process.env.HTTP_PORT}`);
// console.log(`process.env.SQL_HOST      = ${process.env.SQL_HOST}`);
// console.log(`process.env.SQL_USER      = ${process.env.SQL_USER}`);
// console.log(`process.env.SQL_PASSWORD  = ${process.env.SQL_PASSWORD}`);
// console.log(`process.env.SQL_DATABASE  = ${process.env.SQL_DATABASE}`);
