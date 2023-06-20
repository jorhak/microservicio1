import 'dotenv/config'

export const PORT = process.env.PORT

export const MONGODB_URI = process.env['MONGODB_URI']

export const CLOUDINARY_NAME = process.env['CLOUDINARY_NAME']
export const CLOUDINARY_API_KEY = process.env['CLOUDINARY_API_KEY']
export const CLOUDINARY_SECRET_KEY = process.env['CLOUDINARY_SECRET_KEY']

export const AWS_REGION = process.env.AWS_REGION
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY