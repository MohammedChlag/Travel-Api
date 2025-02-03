import dotenv from 'dotenv'

dotenv.config()

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  MYSQL_PORT,
  PORT,
  SECRET,
  UPLOADS_DIR,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_API_KEY,
} = process.env

export {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  MYSQL_PORT,
  PORT,
  SECRET,
  UPLOADS_DIR,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_API_KEY,
}
