function validate (schema) {
    
    function check ( req, res ,next ){
        const promise = schema.validate(req.body, { abortEarly:false });
        
        promise
            .then(() =>{
                next();
            })
            .catch((err) =>{
                console.log(err);
                return res.status(400).send(err.errors[0]);
            })
    }

    return check;
}

module.exports = validate;