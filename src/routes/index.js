"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
//category
router.use('/categories', require('./category'))
// firm:
router.use('/firms', require('./firm'))
// brand:
router.use('/brands', require('./brand'))
// product:
router.use('/products', require('./product'))
// sale:
router.use('/sales', require('./sale'))
// purchase:
router.use('/purchases', require('./purchase'))
// token:
router.use('/tokens', require('./token'))





// document:
//router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router