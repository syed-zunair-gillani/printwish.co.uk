import   React from 'react'
import DeliveryTest from './deliverytest'
import {AiOutlineMinus} from 'react-icons/ai'
import {AiOutlinePlus} from 'react-icons/ai'
import { useState } from 'react'
const data =[

    {
        id:'1',
title: 'What are the delivery days & hours?',
content: 'Dispatches are made from Monday to Friday between 9:00 and 19:00. But if you’re in need of delivery outside of this schedule, we also offer special out-of-hours services. Please, contact us to find out more.'
    },
    {
        id:'2',
       title : 'How much does delivery cost?',
       content : 'It is hard to give you an exact price as this entirely depends on how heavy the package is. The more garments you order, the more the price varies. Materials also affect the end result as these have different weights; it will always cost more to transport a hoodie than a vest, for example. But just to give you an idea, a next day delivery of 20 tees will be around £7.99.' 
    },
    {
        id:'3',
title: 'Do you deliver outside the UK?',
content:'Yes. Garments can be dispatched internationally to a certain number of territories. Keep in mind that pricing for this type of orders are on a case by case basis and import taxes (plus any other cost related to offshore deliveries) are the customer’s responsibility.'
    },
    {
        id:'4',
title:'Do you require a signature on delivery?',
content: 'Yes. In order for garments to arrive safely, all packages are sent via tracked courier services which require someone’s signature upon delivery.'
    },
    {
        id:'5',
        title: 'My package came in damaged. What do I do?',
        content:'As soon as possible, take some pictures of the damage and submit a claim using the Contact form or get in touch directly with your account manager. Keep in mind that our customers’ orders travel in quite resilient double-walled boxes. This means that even if they get bumped during transit, it will probably be just cosmetic and won’t affect the contents.'
    },
    {
        id : '6',
        title : 'Is the delivery 100% guaranteed to arrive on time?',
        content : 'Trust us when we say that we do everything in our power to make sure all packages arrive on time. Unfortunately, there are still rare cases where unexpected issues with courier services may cause delays'
    }
]
type Item = {
    title: string;
    content: string;
  };
  
  type YourComponentProps = {
    data: Item[];
  };
function deliver() {
        const [openItemIndex, setOpenItemIndex] = useState<number | null>(0);
      
        const handleToggleContent = (index: number) => {
          if (openItemIndex === index) {
            // Clicking on the same item again, so close it
            setOpenItemIndex(-1);
          } else {
            // Clicking on a different item, toggle it and close the previously open item
            setOpenItemIndex(index);
          }
        }
    
  return (
    <>
    <main className='items-center lg:ml-10 lg:mr-10   max-w-screen-xl px-6 md:px-6 py-5'>
<div className="container">
<div className="text-center">
    <h2 className='text-[#0088cc] font-[400] leading-[40px] text-[30px] pb-[32px]'>Delivery Information</h2>
    <p className='text-[#7b858a] pb-[1.25rem] font-[400] '>We meet tough deadlines with speedy turn around & quick delivery</p>
</div><div className="lg:flex lg:space-x-5 mb-[20px]">
{
    DeliveryTest.map((item , idx)=>{
        return(
<div key={idx} className="box  lg:w-[33%] bg-[#0088CC] text-white rounded-[10px]">
<div className=" text-center  ">
<h3 className='text-[30px] font-[400] text-white leading-[40px] pb-[20px] pt-4'>{item.Name}</h3>
<p className='m-auto lg:w-[320px] leading-[27px] pb-[20px] ' >{item.description}</p>
<p className='pb-[20px] leading-[27px]  '>{item.Day}</p>
<p className='pb-[2rem] leading-[27px] '> {item.Varenty}</p>
</div>
</div>
)
    })
}

</div>
</div>
<div className="cont">
<div className="lg:flex">
<div className="hea">
    <h2 className='font-[400] text-[30px] text-[#1d2127] pb-[32px]'>Shipping F.A.Q.</h2>
    <p className='text-[#7b858a] pb-[1.25rem]'>Find below the most asked questions regarding our shipping services:</p>
    <div className="box bg-[#f8f8f8]  lg:w-[680px] rounded-md">
    <div className=" cursor-pointer">
{
   data.map((item,idx)=>{
    return(
<div key={idx} className='flex pl-[20px]  border-b-[1px] hover:bg-[#d1d5db] -mt-0'onClick={() => handleToggleContent(idx)}>
<li className='list-none pt-4 '>  {openItemIndex === idx ? <AiOutlineMinus /> : <AiOutlinePlus />}</li>
<h4 className='pt-3 pb-3 '>
    <a className='text-[#666] text-[1em] font-[700] pl-[20px] '>{item.title}</a>
    {openItemIndex === idx &&(
<p className='pb-[1.5rem] text-[16px] font-[400] lg:w-[500px] pt-2 text-[#7b858a] text-left transition duration-700 ease-in-out'>{item.content}</p>
)}
</h4>

</div>
    )
   }) 
}
</div>
</div>

</div>
<div className="ml-5 ">
    <img className='w-[530px]' src="images/bg.png" alt="" />
</div>
</div>
</div>

<div className="footer text-center mt-5 ">
<h2 className='text-[30px] text-[#7b858a]  '>Our preferred couriers</h2>
<div className="couriers lg:flex items-center m-auto  lg:ml-20 mt-3">
<img className='lg:w-[118px] ' src="images/uk.png" alt="" />
<img className='lg:w-[300px] lg:ml-20' src="images/mail.png" alt="" />
<img className='lg:w-[300px] lg:ml-5' src="images/dp.png" alt="" />
<img className='lg:w-[255px] lg:ml-5' src="images/exp.png" alt="" />
</div>
</div>
    </main>
    </>
  )
}

export default deliver