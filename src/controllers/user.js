"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
// User Controller:
/*
{
    "username": "Admin",
    "password": "Uu12345?",
    "email": "admin@test.com",
    "isActive": true,
    "isStaff": false,
    "isAdmin": true
  }
  token: 7683073dfec88a65e8c0377b6668706bc4bd25baee135bcd751723150587ebf4
*/
const User = require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */
        //user sadece kendi kaydını görebilir
        const customFilter = req.user?.isAdmin ? {} : { _id: req.user._id }

        const data = await res.getModelList(User, customFilter)
        //console.log("user bilgisi:", req.user);
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User, customFilter),
            data
        })
    },

    create: async (req, res) => {

        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */
        // user kendini staff veya admin yapamasın
        req.body.isStaff = false
        req.body.isAdmin = false

        const data = await User.create(req.body)

        /* AUTO LOGIN */
        //kullanıcı create edildiğ zaman token ı da otomatik oluşsun
        //yani otomatik login olsun
        const tokenData = await Token.create({
            userId: data._id,
            token: passwordEncrypt(data._id + Date.now())
        })

        /* AUTO LOGIN */


        res.status(201).send({
            error: false,
            token: tokenData.token,
            data
        })
    },

    read: async (req, res) => {

        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

        // admin olmayan sadece kendisini görebilir, Başka bir kullanıcıyı görmesini engelle:
        let customFilter = { _id: req.params.id }
        if (!req.user.isAdmin && !req.user.isStaff) {
            customFilter = { _id: req.user._id }
        }
        //başka bir yöntemle de yapabiliriz customfilter i
        //const customFilter = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }

        const data = await User.findOne(customFilter)

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {

        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */


        //başka bir yöntemle de yapabiliriz customfilter i
        //const customFilter = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }

        // Başka bir kullanıcıyı güncellemesini engelle:
        let customFilter = { _id: req.params.id }
        if (!req.user.isAdmin && !req.user.isStaff) {
            customFilter = { _id: req.user._id }
        }

        // Admin olmayan, isStaff ve isAdmin durumunu değiştiremez.
        if (!req.user.isAdmin) {
            delete req.body.isStaff
            delete req.body.isAdmin
        }
        const data = await User.updateOne(customFilter, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await User.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        const data = await User.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}