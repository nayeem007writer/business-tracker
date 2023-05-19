const userRoutes = require('../../modules/user/user.routes');
const express = require('express');
const cookieParser = require('cookie-parser');
const userStrategy = require('../../modules/user/user.strategy');
const config = require('../index');
const path = require('path');

module.exports = function () {
    const app = express();
    app.use(express.json());
    app.use(cookieParser(process.env.COOKIE_SECRET));

    userRoutes(app);
    userStrategy();

    const globalConfig = config.getGlobalConfig();

    globalConfig.routes.forEach(function (routePath){
        const fullPath = path.resolve(routePath);
        const routes = require(fullPath);
        routes(app);
    });

    globalConfig.strategies.forEach(function (strategyPath){
        const fullStrategyPath = path.resolve(strategyPath);
        const strategy = require(fullStrategyPath );
        strategy();
    })
    
    app.set('port', process.env.PORT);

    return app;
}