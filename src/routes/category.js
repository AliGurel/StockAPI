"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/category:
// URL : /categories

const category = require('../controllers/category')
const permissions = require('../middlewares/permissions')

// router.route('/')
//     // .get(permissions.isStaff,category.list)// controllerda read içinde güncelleme yaptık artık tek ve tüm kayıtları artık read yapabiliyor
//     .get(permissions.isStaff,category.read)
//     .post(permissions.isAdmin,category.create)

// router.route('/:id')
//     .get(permissions.isStaff, category.read)
//     .put(permissions.isAdmin, category.update)
//     .patch(permissions.isAdmin, category.update)
//     .delete(permissions.isAdmin, category.delete)

//yukardkailerin yerine aşağıdaki haliyle de kullanabiliriz 
router.route('/(:id)?') // id olsa da olur olmasa da olur komutu bu
    .post(permissions.isAdmin, category.create)
    .get(permissions.isStaff, category.read)
    .put(permissions.isAdmin, category.update)
    .patch(permissions.isAdmin, category.update)
    .delete(permissions.isAdmin, category.delete)

/* ------------------------------------------------------- */
module.exports = router

