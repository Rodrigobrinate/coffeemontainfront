import Image from 'next/image'
import { Inter } from '@next/font/google'
//import { Container } from './styles'
import styles from './styles.module.css'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import api from '@/components/api'
import Header from '@/components/header/index';
import { SERVER_URL } from '@/service/constants/URLs'
import Cart from '../cart'
import CartContext from './CartContext'


export default function Home() {
  const [products, setProducts] = useState([]) as any;
  
  const [cart , setCart] = useState([]) as any;
  const [open, setOpen] = useState([])as any;
  

  const [openCart, setOpenCart ] = useState(false);
  useEffect(() => {
    
    api.get("/product").then((response) => {
      setProducts(response.data)
      
    })

    if (typeof window !== 'undefined'  ) { 
      //setCart([localStorage.getItem('cart') as string])
      if (localStorage.getItem('cart') == null 
      || localStorage.getItem('cart') == undefined || localStorage.getItem('cart') == 'undefined' 
      || localStorage.getItem('cart') == 'null' || localStorage.getItem('cart') == ''
      || localStorage.getItem('cart') == '{}'
      || localStorage.getItem('cart') == '""' ){
       console.log(localStorage.getItem('cart'))
        localStorage.setItem('cart', JSON.stringify([]))
      }
     setCart(JSON.parse(localStorage.getItem('cart') as string))
     // console.log(JSON.parse(b))
  }


    },[])

useEffect(() => {
  let cart2 = document.querySelectorAll('.cart')
  cart2.forEach((item) =>  item.addEventListener('click', () => {
    setOpenCart(true)
  }))


  
  
  setOpen(<Cart open={openCart} cart={cart} />)

  if (typeof window !== 'undefined'  ) {
    //setCart([localStorage.getItem('cart') as string])
    console.log(cart)
     localStorage.setItem('cart', JSON.stringify(cart))
   // console.log(JSON.parse(b))
}

}, [cart])


  return (
    <CartContext.Provider value={{openCart, setOpenCart, cart, setCart}}>
    <div className={styles.container}>
      <Header />
     {open}



<img className={styles.banner} src="/banner.png" alt="" />

    <br />
    <br />


      <div className={styles.products}>

    {products.map((product: any) => {
      return (
      
    <Card key={product.id}
    className={styles.card}
    sx={{ maxWidth: 255, marginTop: "10px" }}>
      <CardActionArea>
        <CardMedia
        className={styles.card_image}
          component="img"
          height="auto"
          width="120"
          image={SERVER_URL+"/uploads/"+product.image[0]?.url}
          alt="Imagem do produto"
        />
        <CardContent>
        <Rating name="read-only" value={Math.floor(Math.random() * 5) + 1} readOnly />
          <Typography
          className={styles.card_title}
          gutterBottom variant="h5" component="div">
           {product.name}
          </Typography>
          <Typography 
          className={styles.card_description}
          variant="body2" color="text.secondary">
            {product.description.slice(0, 100)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.data_card} >
        <div className={styles.prices}> 
        <p className={styles.price}>R$ {(product.price+(product.price*0,20)).toFixed(2).replace(".", ",")}</p>
          <p className={styles.price_discount}>R$ {product.price.toFixed(2).replace(".", ",")}</p>
        </div>
        <div className={styles.buttons}>
          <span>
        <button className={styles.favorite}>
          <img width={'100%'}  src="/Favorite.png" alt="" />
        </button>
        <button 
        onClick={()=> {
          setOpenCart(true)
          let index = cart.findIndex((item: any) => item.id == product.id)
          let cartCopy = [...cart]
          if (index != -1) {
          cartCopy[index].quantity = cartCopy[index]?.quantity ? cartCopy[index].quantity + 1 : 1+1
          }else {
            product.quantity = 1
          }
          cart.filter((item: any) => item.id == product.id).length == 0 ? 
          setCart([...cart, product]) 
          : setCart(cartCopy)
          
          if (typeof window !== 'undefined'  ) {
            let a = localStorage.getItem('cart') as any
            if (a == null) {
              a = [...cart, product]
            } else {
              a = [...a, product]
            }
         
         
          }
        }} className={styles.add_cart}>
          <img width={'100%'} src="/Shopping-Cart.png" alt="" />

        </button>
        </span>
        <a href={'/product/'+product.id} className={styles.show_btn}>
          Ver
        </a></div>
      </CardActions>
    </Card>
)
    })}
</div>

    </div>
    </CartContext.Provider>
  )
}
