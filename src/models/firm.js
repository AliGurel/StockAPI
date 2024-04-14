"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
const validator = require('validator')
/* ------------------------------------------------------- */

const FirmSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                // Use validator.js library for phone number validation
                //   return validator.isMobilePhone(value, 'any');
                return validator.isMobilePhone(value, 'tr-TR');
            },
            message: 'Invalid phone number'
        },
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: Array,
        default: []
    },

}, {
    collection: "firms",
    timestamps: true
})

module.exports = mongoose.model("Firm", FirmSchema)