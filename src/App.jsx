import { useState, useEffect } from 'react'
import axios from 'axios'
import data from './constant/object.js'

// import Nav from './components/Nav/Nav.jsx'
import Product from './components/Product'
import Cart from './components/Cart.jsx'

const fetchUrl = 'http://localhost:8081/api/products/'
const tg = window.Telegram.WebApp

function App() {
  const [products, setProducts] = useState(data)
  const [count, setCount] = useState(0)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // OnAdd function
  const addProduct = (product) => {
    const exist = cart.find((item) => item.id === product.id)

    if (exist) {
      exist.count += 1
      exist.totalPrice = exist.totalPrice + exist.currentPrice
    } else {
      const newItem = { ...product, count: 1 }
      cart.push(newItem)
    }

    console.log(cart, count)
  }

  // OnDelete function
  const deleteProduct = (product) => {
    const exist = cart.find((item) => item.id === product.id)

    if (exist.count !== 1) {
      exist.count -= 1
      exist.totalPrice = exist.totalPrice - exist.currentPrice
    } else {
      setCart((cart) => {
        return cart.filter((x) => x.id !== product.id)
      })
    }

    console.log(cart, count)
  }

  // Telegram Integration
  const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
      return (acc += item.totalPrice)
    }, 0)
  }

  const showCart = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setIsCartOpen(true)
  }

  useEffect(() => {
    if (cart.length === 0) {
      tg.MainButton.hide()
      setIsCartOpen(false)
      tg.disableClosingConfirmation()
    } else {
      tg.MainButton.show()
      tg.enableClosingConfirmation()
      tg.MainButton.onClick(() => showCart())
      tg.MainButton.setParams({
        text: `Оформить заказ - ${getTotalPrice(cart)}`,
      })
    }

    if (isCartOpen === true) {
      tg.BackButton.show()
      tg.BackButton.onClick(() => setIsCartOpen(false))
      tg.MainButton.setParams({
        text: `Оплатить - ${getTotalPrice(cart)}`,
      })
    } else {
      tg.BackButton.hide()
      tg.MainButton.setParams({
        text: `Оформить заказ - ${getTotalPrice(cart)}`,
      })
    }
  }, [deleteProduct, addProduct, count, setIsCartOpen])

  return (
    <div className='w-[95vw] max-w-[350px] m-auto relative'>
      {/* <Nav />  */}
      <div
        className={`ease-in-out duration-500 transition-all ${
          isCartOpen ? 'translate-y-[-110%]' : ''
        }`}
      >
        <Product
          products={products}
          cart={cart}
          setCount={setCount}
          deleteProduct={deleteProduct}
          addProduct={addProduct}
        />
      </div>

      <div
        className={`absolute top-0 w-full ease-in-out duration-500 transition-all ${
          isCartOpen
            ? 'translate-y-0 visible opacity-100'
            : 'translate-y-[-100%] '
        }`}
      >
        <Cart
          products={products}
          cart={cart}
          setCart={setCart}
          setCount={setCount}
        />
      </div>
    </div>
  )
}

export default App
