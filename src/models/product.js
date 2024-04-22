"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */

const { mongoose } = require('../configs/dbConnection')
// const validator = require('validator')
/* ------------------------------------------------------- */
/*
{
  "brandId" : "661a2ed9d98680738df9357c",
  "categoryId": "66182ae4341ec6c85aa90d3e",
  "name": "test - product",
  "quantity" : 5
}
*/

const ProductSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    //ERD de yoktu hoca ekledi
    price: {
        type: Number,
        // required: true,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    }
},{
    collection: "products",
    timestamps: true
})

module.exports = mongoose.model("Product",ProductSchema)