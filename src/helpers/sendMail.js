"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */

//sendMail(to, subject, message):

const nodemailer = require('nodemailer')

module.exports = function (to, subject, message) {

    //* Google Mail yani GMAIL servisi
    //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aliigurel@gmail.com',
            pass: 'fduo krkf tgok amdr' //gerçek mail pass imiz değil, gmailden aldık bu şifreyi
        }
    })

    transporter.sendMail({
        // from: 'aliigurel@gmail.com', //yazılmayabilir
        to: to, //'info.ephesuss@gmail.com, aliigurel@gmail.com',
        subject: subject, //'Deneme',
        text: message, //'Hello There. How are you?', // ikisi birden kullanılabbilir
        html: message, //'<b> Hello There.</b> <p>How are you</p>'
    }, (error, success)=>console.log(success, error))


    // //? YandexMail (yandex):
    // const transporter = nodemailer.createTransport({
    //     service: 'Yandex',
    //     auth: {
    //         user: 'username@yandex.com',
    //         pass: 'password' // your emailPassword, mail adrsinin passi, google gibi değil
    //     }
    // })
}