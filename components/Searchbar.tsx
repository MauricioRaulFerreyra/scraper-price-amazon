'use client'

import { scrapeAndStoreProduct } from '@/lib/actions'
import { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url)
    const hostname = parsedURL.hostname

    if (hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')) {
      return true
    }
  } catch (error) {
    return false
  }

  return false
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValidLink = isValidAmazonProductURL(searchPrompt)

    if (!isValidLink) return alert('Please provide a valid Amazon product link.')

    try {
      setIsLoading(true)
      // Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt)
      // console.log(product)
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-12 flex flex-wrap gap-4'>
      <input
        type='text'
        className='searchbar-input'
        placeholder='Enter product link'
        value={searchPrompt}
        onChange={e => setSearchPrompt(e.target.value)}
      />
      <button type='submit' className='searchbar-btn' disabled={searchPrompt === ''}>
        {isLoading ? 'Searching ...' : 'Search'}
      </button>
    </form>
  )
}

export default Searchbar
