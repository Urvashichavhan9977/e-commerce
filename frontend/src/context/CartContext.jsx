import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('amrita_cart', []))
  const [wishlist, setWishlist] = useState(() => readStorage('amrita_wishlist', []))

  useEffect(() => {
    localStorage.setItem('amrita_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('amrita_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        )
      }
      return [...prev, { ...product, qty }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) return
    setCart(prev => prev.map(item => (item.id === id ? { ...item, qty } : item)))
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id)
      if (exists) return prev.filter(item => item.id !== product.id)
      return [...prev, product]
    })
  }

  const isWished = (id) => wishlist.some(item => item.id === id)

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        isWished,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
