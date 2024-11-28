'use server'

import { User } from '@/types'
import { revalidatePath } from 'next/cache'
import Product from '../models/product.model'
import { connectToBD } from '../mongoose'
import { generateEmailBody, sendEmail } from '../nodemailer_gmail'
import { scrapeAmazonProduct } from '../scraper'
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils'

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return

  try {
    connectToBD()

    const scrapedProduct = await scrapeAmazonProduct(productUrl)

    if (!scrapedProduct) return

    let product = scrapedProduct

    const existingProduct = await Product.findOne({ url: scrapedProduct.url })

    if (existingProduct) {
      const updatedPriceHistory: any = [...existingProduct.priceHistory, { price: scrapedProduct.currentPrice }]

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory)
      }
    }

    const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url }, product, { upsert: true, new: true })

    revalidatePath(`/products/${newProduct._id}`)
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}

export async function getProductById(productId: string) {
  try {
    connectToBD()

    const product = await Product.findOne({ _id: productId })

    if (!product) return null

    return product
  } catch (error) {
    console.log(error)
  }
}

export async function getAllProducts() {
  try {
    connectToBD()

    const products = await Product.find()

    return products
  } catch (error) {
    console.log(error)
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToBD()

    const currentProduct = await Product.findById(productId)

    if (!currentProduct) return null

    const similarProducts = await Product.find({
      _id: { $ne: productId }
    }).limit(3)

    return similarProducts
  } catch (error) {
    console.log(error)
  }
}

export async function addUserEmailToProduct(productId: string, userEmail: string) {
  // Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userEmail)) {
    console.error('Invalid email format')
    return
  }

  try {
    const product = await Product.findById(productId)

    if (!product) {
      console.error('Product not found')
      return
    }

    const userExists = product.users.some((user: User) => user.email === userEmail)

    if (!userExists) {
      product.users.push({ email: userEmail })

      await product.save()

      const emailContent = await generateEmailBody(product, 'WELCOME')

      console.log('Attempting to send welcome email to:', userEmail)
      await sendEmail(emailContent, [userEmail])
      console.log('Welcome email sent successfully')
    } else {
      console.log('User already exists for this product')
    }
  } catch (error) {
    console.error('Error in addUserEmailToProduct:', error)
  }
}
