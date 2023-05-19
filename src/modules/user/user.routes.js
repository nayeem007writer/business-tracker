const { createUsers, updateUser, getUsers, deleteUser, getUser, login} = require('./user.controller');
const validate = require('../core/middlewires/validate');
const { createUserSchema, updateUserSchema } = require('./user.schema');
const AuthStrategy = require('./user-authentication.middleware');


module.exports = (app) => {
    app.route('/users')
        .post( validate(createUserSchema), createUsers )
        .get(getUsers);

    app.route('/users/:email')
        .patch( AuthStrategy, validate(updateUserSchema),updateUser )
        .get(getUser)
        .delete(deleteUser);

    app.post('/users/login',login);   
}