const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

function login( req, res ) {
    const { email, password} = req.body;
    console.log(email,password);

    const user = users.find( (user) => user.email === email);

    if(!user) return res.status(400).send('Invalid credential');

    const matchedPassword = bcrypt.compareSync(password, user.password);

    if(!matchedPassword) return res.status(400).send('Invalid credential');

    // const token = bcrypt.hashSync('12345678',10);

    // user.token = token;
    const token = jwt.sign({email: user.email, firstName: user.firstName, lastName: user.lastName},process.env.JWT_SECRET ,{expiresIn:'1h', issuer: user.email});

    const modifiedUser = {...user };
    delete modifiedUser.password;

    res.cookie('access_token', token,{
        httpOnly: true
    });
    res.status(200).send(modifiedUser);
}

 async function createUsers( req, res ) {
        try{
            const { firstName, lastName, email, password, confirmPassword }= req.body;
    
            const userExist = await User.findOne({
                where: {email}
            });
               
            if(userExist) return res.status(400).send('User already exists');
        
            const user = await   User.create({
                firstName,
                lastName,
                email,
                password
                })
                     
            res.status(201).send(user);
        }  
        
        catch(err){
            console.log(err);
            res.status(500).send('Internal server error');
        }
}

function getUsers( req, res ) {
    res.send(users);
}

function updateUser( req, res ) {
    const { firstName, lastName } = req.body;

    const user = users.find(user => user.email === req.params.email);

    if(!user) return res.status(404).send('User not found');

    user.firstName = firstName;
    user.lastName = lastName;

    res.status(200).send(user);
    
}

function getUser(req, res) {
    const {email} = req.params;

    const user = users.find(user => user.email === email);

    if(!user) return res.status(404).send('User not found');
 
    return res.send(user);
}

function deleteUser(req, res) {
    const {email} = req.params;

    const user = users.find((user) => user.email === email);

    if(!user) return res.send('User not found');

    const index = users.findIndex((user) => user.email === email);

    users.splice(index, 1);
    res.send('user');
}

function findUser(email){
    const user = users.find(user => user.email === email);

    return user;
}

module.exports.createUsers = createUsers;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.login = login;
module.exports.findUser = findUser;