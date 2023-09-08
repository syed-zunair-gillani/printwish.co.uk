import PageBanner from '@/components/banner/page-banner'
import Product_Box from '@/components/product-widgets/product-box'
import { apiRequest } from '@/config/requests'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Location from '../location'
import { client } from '@/config/client'
import { LOCATION_PAGE } from '@/config/query'
import Pagination from '@/components/pagination/pagination'

const CategorySlug = ({ products, slug, pages, productsForLocationPage }: any) => {
     const { query } = useRouter()
     return (
          <>
               {
                    slug?.includes("t-shirt-printing") ? <Location pages={pages} products={productsForLocationPage}/> : <>
                         {/* CATEGORY PAGE DATA ↓ */}    
                         <PageBanner title={query.page} />
                         <div className='container mx-auto px-3 my-20 w-full'>
                              <div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 gap-1 sm:gap-2 md:gap-4'>
                                   {products?.map((item: any, idx: number) => {
                                        const img = item?.images[0]?.src
                                        return <Product_Box key={idx} data={item} image={img} />
                                   })}
                              </div>
                         </div>
                    </> 
               }
               <Pagination perPage="3" endpoint={`woocommerce-category-api/v1/product-count/${slug}`}/>
          </>

     )
}

export default CategorySlug


export async function getStaticProps({ params }: any) {
     const p = params.page
     const slug = p[0]
     
     if(slug.includes("t-shirt-printing")){
          const response = await client.query({
               query: LOCATION_PAGE,
               variables: {
                    slug: `/locations/${slug}/`,
               },
          });
          const pages = response?.data?.locationBy;

          const dataForProducts = {
               per_page: 30,
               category: 149,
          }
          const { products } = await apiRequest('POST', 'get-products', dataForProducts)

          /* The code `if(!pages) { return { notFound: true } }` is checking if the `pages` variable is
          falsy. If it is, it means that the requested location page does not exist or could not be
          found. In this case, the function returns `{ notFound: true }`, which tells Next.js to
          return a 404 page for this specific route. */
          if(!pages) {
               return {
                    notFound: true
               }
          }

          return {
               props: {
                    productsForLocationPage: products,
                    slug,
                    pages
               },
               revalidate: 10,
          };
     }
     
     
     const dataForCategory = {
          per_page: 100,
     };

     const caterogies = await apiRequest('POST', 'get-products-categories', dataForCategory)
     const getID = caterogies.products.find((item: any) => item.slug === slug)
     console.log("🚀 ~ file: index.tsx:89 ~ getStaticProps ~ getID:", getID)

     const dataForProducts = {
          per_page: 12,
          category: `${getID?.id}`,
     }
     const { products } = await apiRequest('POST', 'get-products', dataForProducts)

     if(!products) {
          return {
               notFound: true
          }
     }
     return {
          props: {
               products: products,
               slug,
          },
          revalidate: 10,
     };
     
}

export const getStaticPaths: GetStaticPaths = async () => {
     const paths: any = [];
     return {
          paths,
          fallback: 'blocking',
     };
}
