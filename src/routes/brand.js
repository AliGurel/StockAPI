"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/brand:

const brand = require('../controllers/brand')
const permissions = require('../middlewares/permissions')

// URL: /brands

//Kısaltılmış Route yapısı;
router.route('/(:id)?')
    .post(permissions.isAdmin, brand.create)
    .get(permissions.isStaff, brand.read)
    .put(permissions.isAdmin, brand.update)
    .patch(permissions.isAdmin, brand.update)
    .delete(permissions.isAdmin, brand.delete)

/* ------------------------------------------------------- */
module.exports = router