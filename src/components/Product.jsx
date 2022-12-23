import React from 'react'
import Button from './ButtonAdd.jsx'

const Product = (props) => {
  const { products, cart, setCount, deleteProduct, addProduct } = props

  return (
    <div className='grid grid-cols-3 gap-9 pt-16 text-center'>
      {products.map((product) => (
        <li key={product.id} className='list-none font-medium text-[#fff] '>
          <span className='text-[2.7rem] w-full'>
            <img src={product.img} alt='' />
          </span>
          <span className='block mt-2'>{product.title}</span>
          <span className='text-sm'>
            {product.currentPrice.toLocaleString('ru')}
          </span>
          <Button
            setCount={setCount}
            product={product}
            products={products}
            cart={cart}
            deleteProduct={deleteProduct}
            addProduct={addProduct}
          />
        </li>
      ))}
    </div>
  )
}


export default Product
