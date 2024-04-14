"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/brand:

const brand = require('../controllers/brand')
const permissions = require('../middlewares/permissions')

router.route('/')
    .get(permissions.isLogin,brand.list)
    .post(permissions.isAdmin,brand.create) // AllowAny

router.route('/:id')
    .get(permissions.isLogin, brand.read)
    .put(permissions.isAdmin, brand.update)
    .patch(permissions.isAdmin, brand.update)
    .delete(permissions.isAdmin, brand.delete)

/* ------------------------------------------------------- */
module.exports = router

