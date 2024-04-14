"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
// const validator = require('validator')
/* ------------------------------------------------------- */

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    image: {
        type: Array,
        default: []
    },
},{
    collection: "brands",
    timestamps : true
})

module.exports = mongoose.model("Brand",BrandSchema)