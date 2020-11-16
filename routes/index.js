module.exports = (app) => {

    const usersController = require('../controllers/users');
    app.use('/users', usersController);

    // const stockController = require('../controllers/stocks');
    // app.use('/stocks', stockController);

}