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
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    priceTotal: {
        type: Number,
        // default: function(){ return this.quantity * this.price }, // Create
        // transform: function(){ return this.quantity * this.price }, // Update
    },
},{
    collection: "sales",
    timestamps: true
})

module.exports = mongoose.model("Sale",SaleSchema)