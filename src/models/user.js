"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
const passwordEncrypt = require('../helpers/passwordEncrypt')
/* ------------------------------------------------------- */
// USER MODEL
/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "aA*123456",
    "email": "admin@site.com",
    "firstName": "admin",
    "lastName": "admin",
    "isActive": true,
    "isStaff": true,
    "isAdmin": true
}
{
    "username": "staff",
    "password": "aA*123456",
    "email": "staff@site.com",
    "firstName": "staff",
    "lastName": "staff",
    "isActive": true,
    "isStaff": true,
    "isAdmin": false
}
{
    "username": "test",
    "password": "aA*123456",
    "email": "test@site.com",
    "firstName": "test",
    "lastName": "test",
    "isActive": true,
    "isStaff": false,
    "isAdmin": false
}
/* ------------------------------------------------------- */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
        //minlength maxlength verilebilir
    },
    password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => {
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)) {
                return passwordEncrypt(password)
            } else {
                throw new Error('Password type is not correct.')
            }
        },
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email field must be required'],
        unique: [true, 'Email field must be unique'],
        index: true,
        validate: [
            (email) => { 
                const regexEmailCheck=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return regexEmailCheck.test(email)                
            },
            'Email type is not correct.'
        ]
    },
    firstName: String,

    lastName: String,

    isActive: {
        type: Boolean,
        default: true,
    },

    isStaff: {
        type: Boolean,
        default: false,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

},{
    collection: 'users', 
    timestamps: true
})
//https://mongoosejs.com/docs/middleware.html#pre
//pre middleware ler
//hocanın tavsiyesi set ve validasyon işlemini yukarda field da yapmamız mış, pre yi göstermek için burda yapmış



module.exports = mongoose.model("User",UserSchema)
