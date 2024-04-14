"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | StockAPI
------------------------------------------------------- */
// Auth Controller

const User = require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')
//const jwt = require('jsonwebtoken')

module.exports = {

    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

        const { username, email, password } = req.body

        if ((username || email) && password) {

            // const user = await User.findOne({ username })
            const user = await User.findOne({ $or: [{ username }, { email }] })

            if (user && user.password == passwordEncrypt(password)) {

                if (user.isActive) {

                    /* TOKEN */

                    let tokenData = await Token.findOne({ userId: user._id })

                    if (!tokenData) {
                        const tokenKey = passwordEncrypt(user._id + Date.now())
                        tokenData = await Token.create({ userId: user._id, token: tokenKey })
                    }

                    /* TOKEN */

                    res.status(200).send({
                        error: false,
                        token: tokenData.token,
                        // bearer: {
                        //     access: accessToken,
                        //     refresh: refreshToken
                        // },
                        user
                    })

                } else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }

            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username or password.')
            }

        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username and password.')
        }

    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "SimpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

        const auth = req.headers?.authorization || null // Token ...tokenKey...
        const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

        const tokenData = await Token.deleteOne({ token: tokenKey[1] })

        res.send({
            error: false,
            message: 'Logout was OK.',
            data: tokenData
        })
    },
}