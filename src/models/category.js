"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        set:(name) => name.toUpperCase()//gelen tüm kayıtlar büyük harfe çevrilsin ki aynı kategori farklı zamanalrda eklenmesin
    }
},{
    collection: "categories",
    timestamps: true
})

module.exports = mongoose.model("Category", CategorySchema)