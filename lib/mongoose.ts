import mongoose from 'mongoose'

let isConneted = false // Variable to check if the database is connected or not

export const connectToBD = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGO_URI) return console.log('No MONGO_URI provided')

  if (isConneted) return console.log('==> using existing database connection')

  try {
    await mongoose.connect(process.env.MONGO_URI)

    isConneted = true

    console.log('Database connected successfully')
  } catch (error: any) {
    console.log({ error })
  }
}
