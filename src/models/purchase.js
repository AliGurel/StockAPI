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
  "firmId": "661a2c0d61899aea57d289df"
  "brandId": "661a2ed9d98680738df9357c",
  "productId": "661a32ba4ccead7eeb29fe4b",
  "price": "2000",
}
*/
// Purchase Model
const PurchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm",
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
    //kaç adet aldı
    quantity: {
        type: Number,
        default: 1,
    },
    // render ederken isim amount olduğu için bunu priceTotal değil amount yaptık
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
    collection: "purchases",
    timestamps: true
})

module.exports = mongoose.model("Purchase", PurchaseSchema)