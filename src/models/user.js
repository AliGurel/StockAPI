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

/* REGEX AÇIKLAMASI

/ - Regex başlangıç sınırlayıcısı

^ - String'in başlangıcını belirtir

\w+ - Bir veya daha fazla alfabetik karakter, rakam veya underscore (_) karakteri. Bunlar e-posta adresinin kullanıcı adı bölümünü temsil eder.

([\.-]?\w+)* - Nokta (.) veya tire (-) ve ardından bir veya daha fazla alfanumerik karakterden oluşan opsiyonel bir grup. E-posta adresinde bölüm ayırıcıları olarak kullanılabilir. * işareti bu grubun sıfır veya daha fazla kez tekrar edebileceğini gösterir.

\@ - Bir @ sembolü arar.

\w+ - E-posta adresinin domain kısmındaki alfanumerik karakterler.

(\.[a-z]{2,3})+ - Nokta (.) ve ardından 2 veya 3 harften oluşan bir grup. Bu, e-posta adresinin uzantısını (com, net vb.) temsil eder.

$ - String'in bitişini belirtir.

*/

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
        //aşağıdaki validasyon işlemini ister burda ister aşağıdaki pre(save) middlewarinde de yapabiliriz
        //ama doğrusu burada yapmak dedi hoca
        validate: [
            (email) => {
                const regexEmailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
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

}, {
    collection: 'users',
    timestamps: true
})
//? PRE MIDDLEWARE
/*
//https://mongoosejs.com/docs/middleware.html#pre
//pre(save) middleware ler create de çalışır ama updateOne de çalışmazmış
//bunun için ['save,'updateOne'] kullanıcaz
//hocanın tavsiyesi set ve validasyon işlemini yukarda field da yapmamız mış, pre yi göstermek için burda yapmış, kullanıcağımız ve kullanmayı tavsiye ettiği bi yöntem değilmiş
// UserSchema.pre('save', function (next) {
UserSchema.pre(['save','updateOne'], function (next) {
    //gelen data this parametresinin içinde
    // console.log(this)
    //şimdilik this içindeki verileri data değişkenine atayıp kontrolleri bu değişken üzerinde yapalım
    //işimiz bitince this de güncelleyelim

    // updateOne yaptığımızda, data blgisi _update isimli değişkende geliyor, direkt this de gelmiyor, create yaptığımızda direkt olarak this de geliyordu, o nedenle aşağıdaki kontrolü yaptı
    const data = this?._update || this
    //email@domain.com
    // email varsa kontrol et yoksa direkt true de
    const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

    if (isEmailValidated) {
        console.log('Email OK')
        if(data?.password) { //data içinde password varsa kontrol et, gönderilmemişse kaale alma
            const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password)

            if (isPasswordValidated) {
                console.log('Password OK')

                data.password = passwordEncrypt(data.password)
                if (this?._update) {
                    this._update = data
                    // this._update.password = data.password 

                } else {
                    // this = data // izin vermiyor.
                    this.password = data.password
                }
                //? ShortHand:
                // // save:
                // this.password = data.password = passwordEncrypt(data.password)
                // // update:
                // this._update = data

            }else {
                next(new Error('Password is not validated')) // middleware içinden errorHandler a hata gönderme bu şeklde olur
            }
        }
        next()
    } else {
        next(new Error('Email is not validated')) // middleware içinden errorHandler a hata gönderme bu şeklde olur
    }
    
})
*/

module.exports = mongoose.model("User", UserSchema)
