"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */

const { mongoose } = require('../configs/dbConnection')
// const validator = require('validator')
/* ------------------------------------------------------- */
/*
{
  "userId" : "66181d9f101f0b5963d1664e",
  "brandId": "661a2ed9d98680738df9357c",
  "productId": "661a32ba4ccead7eeb29fe4b",
  "price": "500",
}
*/

const SaleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    amount: {
        type: Number,
        // create yaparken bir değer göndermediğimiz zaman SET ÇALIŞMAZ, DEFAULT ÇALIŞIR
        // create yaparken bir değer gönderdiğimiz zaman da DEFAULT ÇALIŞMAZ, SET ÇALIŞIR
        // update yaprken her türlü TRANSFORM ÇALIŞIR
        set: function(){ return this.quantity * this.price }, // Update
        //alttaki işlemleri controller create de da yapabilirsiniz dedi
        default: function(){ return this.quantity * this.price }, // Create
        transform: function(){ return this.quantity * this.price }, // Update
        
    },
},{
    collection: "sales",
    timestamps: true
})

/* ------------------------------------------------------- */
// https://mongoosejs.com/docs/middleware.html

// pre('init') -> Ekrana veriyi vermeden önce veriyi (çıktıyı) manipule edebiliriz:
// pre(init) populate den önce çalışır
// middleware değil, next gerek yok:
//mongoDB de datalara document deniyor, document ekrana çıkan datayı temsil eder
SaleSchema.pre('init', function (document) {
    // console.log(document)
    //çıkan dataya extraField adında field ekle
    document.extraField = 'Deneme 15'
    //__v ekranda gözükmesin mesela
    document.__v = undefined

    // toLocaleDateString:
    // https://www.w3schools.com/jsref/jsref_tolocalestring.asp
    document.createdAtStr = document.createdAt.toLocaleString('tr-tr', { dateStyle: 'full', timeStyle: 'medium' })
    document.updatedAtStr = document.updatedAt.toLocaleString('tr-tr', { dateStyle: 'full', timeStyle: 'medium' })
    //eğer normal createdAt i hiç görmek istemiyorsak aşağıdakileri yapabiliriz
    // document.createdAt = undefined
    // document.updatedAt = undefined
})

module.exports = mongoose.model("Sale",SaleSchema)