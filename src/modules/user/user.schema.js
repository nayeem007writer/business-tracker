const { string, object, ref } = require('yup');

const createUserSchema = object().shape({
    
    firstName: string()
        .min(2,'Name must be at least 2 characters long')
        .max(20,'Name must be at least 30 characters long') 
        .required('Name feild must not be empty'), 

    lastName: string()
        .min(2,'Name  must be at least 2 characters long')
        .max(20,'Name must be at least 30 characters long') 
        .required('Name must not be empty'),

    email: string()
        .email('This feild should be a valid email address')
        .required('This feild must not be empty'),
    
    password: string()
            .min(8,'Tassword must be at least 8 characters long')
            .max(50,'The password must be at most 50 characters long')
            .required('Password is required'),
    
    confirmPassword: string()
            .required('Confirm password is required')
            .oneOf([ref('password'),null],'Password and confirm password should be matched')        
});

const updateUserSchema = object().shape({
    
    firstName: string()
        .min(2,'Name must be at least 2 characters long')
        .max(20,'Name must be at least 30 characters long') 
        .required('Name feild must not be empty'), 

    lastName: string()
        .min(2,'Name  must be at least 2 characters long')
        .max(20,'Name must be at least 30 characters long') 
        .required('Name must not be empty'),      
});

module.exports.updateUserSchema = updateUserSchema ;
module.exports.createUserSchema = createUserSchema;

