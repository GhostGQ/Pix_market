import React from 'react'

const Count = (props) => {
  const { exist } = props

  return (
    <div>
      {exist && exist.count > 0 ? (
        <span className='text-[1rem] rounded-2xl bg-slate-500 px-[5px]'>
          {exist.count}
        </span>
      ) : null}
    </div>
  )
}

export default Count
