import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Category_Box = ({ data }: any) => {
    return (
        <div className=''>
            <Link href={`/${data?.slug}`}>
                <Image src={data?.image?.src} alt="image" width={300} height={300} className='object-fill mx-auto mb-3' />
                <div className=''>
                    <p className='text-2xl font-semibold text-accent hover:text-secondary text-center font-opensans'>
                        {data?.name}
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default Category_Box