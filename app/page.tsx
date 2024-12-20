import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import Searchbar from '@/components/Searchbar'
import { getAllProducts } from '@/lib/actions'
import Image from 'next/image'

export default async function Page() {
  const allProducts = await getAllProducts()

  return (
    <>
      <section className='px-6 py-24 md:px-20'>
        <div className='flex gap-16 max-xl:flex-col'>
          <div className='flex flex-col justify-center'>
            <p className='small-text'>
              Smart Shopping Starts Here
              <Image src='/assets/icons/arrow-right.svg' alt='arrow-right' width={16} height={16} />
            </p>
            <h1 className='head-text'>
              Unleash the Power of
              <span className='bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-transparent'> PriceWise</span>
            </h1>
            <p className='mt-6'>
              Powerful self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      {/* ********************************************************************************************************* */}
      <section className='trending-section'>
        <h2 className='section-text'>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProducts && allProducts.length > 0 ? (
            allProducts.map(product => <ProductCard key={product._id} product={product} />)
          ) : (
            <p>No hay productos disponibles</p>
          )}
        </div>
      </section>
    </>
  )
}
