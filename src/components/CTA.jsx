import React from 'react'

const CTA = (props) => {
  const { onRemoveHandler, product, onAddHandler, addProd, item} = props
  
  return (
    <div
      className='flex justify-center gap-1'
    >
      <button onClick={() => onRemoveHandler(product)} className='active:scale-90'>
        <span className='h-0 py-1 px-[17px] rounded-[7px] bg-[#46527c] text-[20px]'>-</span>
      </button>

      <button onClick={() => onAddHandler(product)} className='active:scale-90'>
        <span className='h-0 py-1 px-[15px] rounded-[7px] bg-[#46527c] text-[20px]'>+</span>
      </button>
    </div>
  )
}

export default CTA
