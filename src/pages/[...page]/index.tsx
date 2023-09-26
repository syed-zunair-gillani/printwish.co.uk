import PageBanner from '@/components/banner/page-banner'
import Product_Box from '@/components/product-widgets/product-box'
import { apiRequest } from '@/config/requests'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Location from '../location'
import { client } from '@/config/client'
import { GetProductByTag, LOCATION_PAGE, PRODUCT_CATEGORY_INFO } from '@/config/query'
import Pagination from '@/components/pagination/pagination'
import Faqs from '@/components/faqs/faqs'

const CategorySlug = ({ products, slug, pages, productsForLocationPage, category, categoryInfo }: any) => {
console.log("🚀 ~ file: index.tsx:14 ~ CategorySlug ~ category:", category)

     const { query } = useRouter()
     const page = query?.page?.[0] ?? null;

     return (
          <>
               {
                    slug?.includes("t-shirt-printing") && slug !== "custom-t-shirt-printing-cheap-t-shirt-printing" ? <Location pages={pages} products={productsForLocationPage} /> : <>
                         {/* CATEGORY PAGE DATA ↓ */}
                         <PageBanner title={category.name} category={category} />
                         {
                              page === 't-shirts' && <section className='container mx-auto px-3 mt-2 md:mt-6'>
                                   <div className='font-bold text-xl md:text-2xl bg-primary text-white text-center mt-4 p-2'>BRANDED T-SHIRTS</div>
                              </section>
                         }

                         {
                              products.length > 0 ? <div className='container mx-auto px-3 my-10 w-full'>
                                   <div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 gap-1 sm:gap-2 md:gap-4'>
                                        {products?.map((item: any, idx: number) => {
                                             const img = item?.images[0]?.src
                                             return <Product_Box key={idx} data={item} image={img} />
                                        })}
                                   </div>
                                   <div className='category_pages mt-10'>
                                        <div
                                             dangerouslySetInnerHTML={{ __html: categoryInfo?.content }}
                                        />
                                   </div>
                                   {
                                        categoryInfo?.faqs?.length > 0 && <div> 
                                           <h2 className='text-gray-400 text-xl font-light md:text-3xl'> Frequently Asked Questions </h2>
                                           <Faqs data={categoryInfo?.faqs} />
                                        </div>
                                   }
                                   
                              </div> : <p className='container mx-auto px-3 my-20 w-full text-center'>Result Not Found!</p>
                         }

                    </>
               }
               {/* {
                    products?.length > 12 && <Pagination perPage="3" endpoint={`woocommerce-category-api/v1/product-count/${slug}`}/>
               } */}

               <div className='mb-16' />
          </>

     )
}

export default CategorySlug


export async function getStaticProps({ params }: any) {
     const p = params.page
     const slug = p[0]

     if (slug.includes("t-shirt-printing") && slug !== "custom-t-shirt-printing-cheap-t-shirt-printing") {
          const response = await client.query({
               query: LOCATION_PAGE,
               variables: {
                    slug: `/locations/${slug}/`,
               },
          });
          const pages = response?.data?.locationBy;

          const { data } = await client.query({
               query: GetProductByTag,
               variables: {
                    tag: slug.replace('t-shirt-printing-', ''),
               },
          });

          const products = data.productTag?.products.nodes;

          /* The code `if(!pages) { return { notFound: true } }` is checking if the `pages` variable is
          falsy. If it is, it means that the requested location page does not exist or could not be
          found. In this case, the function returns `{ notFound: true }`, which tells Next.js to
          return a 404 page for this specific route. */
          if (!pages) {
               return {
                    notFound: true
               }
          }
          return {
               props: {
                    productsForLocationPage: products,
                    slug,
                    pages,
               },
          };
     }

     const response = await client.query({
          query: PRODUCT_CATEGORY_INFO,
          variables: {
               category: slug,
          },
     });

     const dataForCategory = {
          per_page: 100,
     };

     const caterogies = await apiRequest('POST', 'get-products-categories', dataForCategory)
     const getID = caterogies.products.find((item: any) => item.slug === slug)

     const dataForProducts = {
          per_page: 100,
          orderby: "menu_order",
          category: `${getID?.id}`,
     }
     const { products } = await apiRequest('POST', 'get-products', dataForProducts)

     if (!products) {
          return {
               notFound: true
          }
     }
     return {
          props: {
               products: products,
               slug,
               category: getID,
               categoryInfo: response?.data?.productCategory?.categoryInfo
          },
     };

}

export const getStaticPaths: GetStaticPaths = async () => {
     const paths: any = [];
     return {
          paths,
          fallback: 'blocking',
     };

}
