import React, { useEffect, useState } from 'react'
import CTA from './CTA.jsx'
import Count from './Count.jsx'

const Button = (props) => {
  const { product, cart, setCount, deleteProduct, addProduct} = props

  const exist = cart.find((item) => item.id === product.id)

  const onAddHandler = (product) => {
    addProduct(product)
    setCount((prev) => prev + 1)
  }
  const onRemoveHandler = (product) => {
    deleteProduct(product)
    setCount((prev) => prev - 1)
  }

  return (
    <div className='w-full relative mt-1'>
      <button
        onClick={() => onAddHandler(product)}
        className={
          exist && exist.count > 0
            ? 'ease-in duration-200 invisible scale-0 will-change-transform'
            : 'py-[5px] px-[9px] rounded-[7px] bg-[#46527c] text-[#fff] text-[15px] relative z-[999] transition-all scale-100 will-change-transform'
        }
      >
        Добавить
      </button>

      <div
        className={
          exist && exist.count > 0
            ? 'text-[1.2rem] absolute top-0 w-full mx-auto will-change-transform'
            : 'ea duration-200 opacity-0 invisible absolute top-0 w-full mx-auto will-change-transform'
        }
      >
        <CTA
          exist={exist}
          onRemoveHandler={onRemoveHandler}
          onAddHandler={onAddHandler}
          product={product}
        />
        <span className='absolute top-[-9.5rem] left-0'><Count exist={exist} /></span>
      </div>
    </div>
  )
}

export default Button
