import React from 'react'
import { SiSmashingmagazine } from 'react-icons/si'
import Count from './Count.jsx'

const Cart = (props) => {
  const { cart, setCart, setCount } = props

  const addProd = (item) => {
    item.count += 1
    item.totalPrice = item.totalPrice + item.currentPrice
    setCount((prev) => prev + 1)
    console.log(cart)
  }

  // ------------------------------------------------- \\

  const delProd = (item) => {
    if (item.count !== 1) {
      item.count -= 1
      item.totalPrice = item.totalPrice - item.currentPrice
    } else {
      setCart((cart) => {
        return cart.filter((x) => x.id !== item.id)
      })
    }
    setCount((prev) => prev - 1)
    console.log(cart)
  }

  return (
    <div className='pt-16 text-center text-white'>
      <ul className='flex flex-wrap gap-4'>
        {cart.map((item) => (
          <li key={item.id} className='w-full flex justify-between relative'>
            <div className='flex items-center w-[77%]'>
              <img src={item.img} className='block w-[5rem] h-[5rem]' />

              <div className='flex flex-col text-left ml-2'>
                <span>{item.title}</span>
                <span className='text-[13px] pr-1 mt-1'>{item.desc}</span>
              </div>
            </div>

            <div className='flex flex-col justify-center w-[20%] gap-1'>
              <span>{item.totalPrice.toLocaleString('ru')}</span>

              <div className='flex justify-center gap-1'>
                <button
                  onClick={() => delProd(item)}
                  className='active:scale-90'
                >
                  <span className='h-0 px-[15px] rounded-[7px] bg-[#46527c] text-[22px]'>
                    -
                  </span>
                </button>

                <button
                  onClick={() => addProd(item)}
                  className='active:scale-90'
                >
                  <span className='h-0 px-[13px] rounded-[7px] bg-[#46527c] text-[22px]'>
                    +
                  </span>
                </button>
              </div>
            </div>

            <span className='absolute h-[1.18rem] top-0 text-[0.9rem] rounded-2xl bg-slate-500 px-[5px] font-medium'>
              {item.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Cart
