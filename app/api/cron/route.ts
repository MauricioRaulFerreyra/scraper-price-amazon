import { NextResponse } from 'next/server'

import Product from '@/lib/models/product.model'
import { connectToBD } from '@/lib/mongoose'
import { generateEmailBody, sendEmail } from '@/lib/nodemailer_gmail'
import { scrapeAmazonProduct } from '@/lib/scraper'
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from '@/lib/utils'

export const maxDuration = 60 // This function can run for a maximum of 300 seconds
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    await connectToBD()

    const products = await Product.find({})

    if (products.length === 0) {
      return NextResponse.json(
        {
          message: 'No products found',
          data: []
        },
        { status: 404 }
      )
    }

    // == 1 SCRAPE LATEST PRODUCT DETAILS & UPDATE DB
    const updatedProducts = await Promise.all(
      products.map(async currentProduct => {
        try {
          // Scrape product
          const scrapedProduct = await scrapeAmazonProduct(currentProduct.url)

          if (!scrapedProduct) return null

          const updatedPriceHistory = [
            ...currentProduct.priceHistory,
            {
              price: scrapedProduct.currentPrice
            }
          ]

          const product = {
            ...scrapedProduct,
            priceHistory: updatedPriceHistory,
            lowestPrice: getLowestPrice(updatedPriceHistory),
            highestPrice: getHighestPrice(updatedPriceHistory),
            averagePrice: getAveragePrice(updatedPriceHistory)
          }

          // Update Products in DB
          const updatedProduct = await Product.findOneAndUpdate({ url: product.url }, product, { new: true })

          // == 2 CHECK EACH PRODUCT'S STATUS & SEND EMAIL ACCORDINGLY
          const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct)

          if (emailNotifType && updatedProduct.users.length > 0) {
            const productInfo = {
              title: updatedProduct.title,
              url: updatedProduct.url
            }
            // Construct emailContent
            const emailContent = await generateEmailBody(productInfo, emailNotifType)
            // Get array of user emails
            const userEmails = updatedProduct.users.map((user: any) => user.email)
            // Send email notification
            await sendEmail(emailContent, userEmails)
          }

          return updatedProduct
        } catch (productError) {
          console.error(`Error processing product ${currentProduct.url}:`, productError)
          return null
        }
      })
    )

    const filteredProducts = updatedProducts.filter(product => product !== null)

    return NextResponse.json({
      message: 'Products updated successfully',
      data: filteredProducts
    })
  } catch (error: any) {
    console.error('Cron job error:', error)
    return NextResponse.json({ message: `Failed to process products: ${error.message}` }, { status: 500 })
  }
}
