const sequelize = require('../../confiq/lib/sequelize');
const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

const Leadhead = sequelize.define("leadheads",{
    id:{
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4

    },

    title: {
        allowNull:false,
        type: DataTypes.STRING,
        set(value){
            this.setDataValue( "password", bycript.hashSync( value, 10 ));
        }

    }
},{
    tableName: "user",
    timestamps:true,
    createdAt:"created_at",
    updatedAt: "updated_at"
});

User.prototype.validPassword = function (password){
    return  bcrypt.compareSync(password, this.password);
}

module.exports = User;