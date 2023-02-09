require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.ATLAS_URI
const SMTP_PASSWORD = process.env.SMTP_PASSWORD

module.exports = {
  MONGODB_URI,
  PORT,
  SMTP_PASSWORD
}