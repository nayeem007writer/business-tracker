const path = require('path');

function init(){
    const config = require('./src/confiq/');

    config.initEnviromentVariables();

    const sequelize = require('./src/confiq/lib/sequelize.js');

    sequelize
    .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
    .then(() => {
        require('./src/modules/user/user.model');
        sequelize
        .sync()
        .then(()=>{
            console.log('DB seed complete')
        })
        .catch((err) =>{
            console.log("h",err);
        })
    })
    .catch((err) =>{
        console.log("h2",err);
    })
}

init();