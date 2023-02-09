const { request } = require('express')
const EmailRouter = require('express').Router()
const Email = require('../models/Emails.model')
var nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure:false,
    auth: {
        user: "greddit172@gmail.com",
        pass: process.env.SMTP_PASSWORD
    }
})




