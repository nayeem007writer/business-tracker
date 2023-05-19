(function () {
    const path = require('path');
    const confiq = require(path.join(process.cwd(),"./src/confiq/index.js"));
    confiq.initEnviromentVariables();

    const app = require('./src/confiq/lib/app');

    app.start();
})();