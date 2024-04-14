"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/category:

const category = require('../controllers/category')
const permissions = require('../middlewares/permissions')

router.route('/')
    .get(permissions.isLogin,category.list)
    .post(permissions.isAdmin,category.create) // AllowAny

router.route('/:id')
    .get(permissions.isLogin, category.read)
    .put(permissions.isAdmin, category.update)
    .patch(permissions.isAdmin, category.update)
    .delete(permissions.isAdmin, category.delete)

/* ------------------------------------------------------- */
module.exports = router

