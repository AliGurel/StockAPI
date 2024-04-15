"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const user = require('../controllers/user')
const permissions = require('../middlewares/permissions')

// URL: /users

router.route('/')
    //admin kontrolünü user controller list de yaptığı için isAdmin demedik burda
    // .get(permissions.isAdmin, user.list)
    .get(permissions.isLogin, user.list)
    .post(user.create) // AllowAny

router.route('/:id')
    .get(permissions.isLogin, user.read)
    .put(permissions.isLogin, user.update)
    .patch(permissions.isLogin, user.update)
    .delete(permissions.isAdmin, user.delete)

/* ------------------------------------------------------- */
module.exports = router