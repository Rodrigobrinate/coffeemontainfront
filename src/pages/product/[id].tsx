import Image from 'next/image'
import { Inter } from '@next/font/google'
//import { Container } from './styles'
import styles from './styles.module.css'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Modal, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '@/components/api'
import Header from '@/components/header/index';
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap'
import { SERVER_URL } from '@/service/constants/URLs'
import { toast } from 'react-toastify'
import Cart from '../cart/index'
import CartContext from '../home/CartContext'
import { Favorite, HearingDisabledOutlined, HeartBroken, Search, ShoppingCart } from '@mui/icons-material'




const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  
};

let styleLabel = {
  radioButtonLabel: {

    width: "100%", 
    border: "1px solid gray", 
    padding: '10px', 
    borderRadius: "10px", 
    display: "flex", 
    flexWrap: "wrap", 
    justifyContent: "space-between",
    marginTop: "10px"
  },
  radioButtonLabelChecked: {
    width: "100%", 
    border: "3px solid green", 
    padding: '10px', 
    borderRadius: "10px", 
    display: "flex", 
    flexWrap: "wrap", 
    justifyContent: "space-between",
    marginTop: "10px",
  }

} as any
 const styleInput = {
  marginLeft: "10%", 
  marginTop: "10px", 
  padding: "10px", 
  borderRadius: "5px", 
  border: "1px solid black"}

const addrespinput = {
  width: "40%", 
  padding:"0px",
  margin: "0px", 
  fontSize: "1vw"} as any

 
export default function Home() {
  const [product, setProduct] = useState([]) as any
  const [openModalCreateAdrress, setOpenModalCreateAdrress] = useState(false);
  const handleOpenModalCreateAdrress = () => setOpenModalCreateAdrress(true);
  const handleCloseModalCreateAdrress = () => setOpenModalCreateAdrress(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addressId, setAddressId] = useState(0);
  const [addresses, setAddresses] = useState([]) as any
  const [address, setAddress] = useState("") as any
  const [cep, setCep] = useState("") as any
  const [number, setNumber] = useState("") as any
  const [complement, setComplement] = useState("") as any
  const [neighborhood, setNeighborhood] = useState("") as any
  const [city, setCity] = useState("") as any
  const [state, setState] = useState("") as any
  const [country, setCountry] = useState("") as any
  const [openCart, setOpenCart] = useState([]) as any
  const [cart , setCart] = useState([]) as any
  //get the params from the url with next/router

  const router = useRouter()
  const { id } = router.query
  


  useEffect(() => {

    api.get("/product/"+id).then((response) => {
      setProduct(response.data)
      
  })

 
  
  

    },[id])


    useEffect(() => {
      let cart2 = document.querySelectorAll('.add-cart')
      cart2.forEach((item) =>  item.addEventListener('click', () => {
        setOpenCart(true)
      }))
    
    
      
      
      setOpenCart(<Cart open={openCart} cart={cart} />)
    
      if (typeof window !== 'undefined'  ) {
        //setCart([localStorage.getItem('cart') as string])
        console.log(cart)
         localStorage.setItem('cart', JSON.stringify(cart))
       // console.log(JSON.parse(b))
    }
    
    }, [cart])


    

    function checkout() {

      if (localStorage.getItem("token") == null) {
        window.location.href = "/login"
        return
      }

      


 

      api.post("/order/create", {
        productId: product.id,
        quantity: 1,
        price: product.price,
        addressId: addressId,
        name: product.name,
      }).then((response) => {
        window.location.href = response.data
      })
    }


    function createAddress() {
    api.post("/address/create", {
      zipCode: cep,
      number: number,
      complement: complement,
      neighborhood: neighborhood,
      city: city,
      state: state,
      country: country,
      street: address
    }).then((response) => {
      setAddressId(response.data.id)
      setAddress(response.data)
      handleCloseModalCreateAdrress()
      api.get("/address").then((response) => {
        setAddresses(response.data)
          
      })
    }).catch((error) => {
      console.log(error)
      toast.error('Erro ao criar endereço')
    })
    
    }




  return (
    <div className={styles.container} >
      <CartContext.Provider value={{openCart, setOpenCart, cart, setCart}}>
      <Header />
<div>
<span className={styles.main}>
<span className={styles.carroseu}>
<Carousel >
  {product?.image?.map((item: any, i: number) => {
    return ( 
    <Carousel.Item key={i}>
        <img
          className="d-block w-100"
          src={SERVER_URL+"/uploads/"+item.url}
          alt="First slide"
        />
        
      </Carousel.Item>

    )
  })}     
    </Carousel>
</span>

<span className={styles.data}>


<h4 className={styles.h4}>{product.name}</h4>
<p className={styles.price} >De R$ {(product.price+(product.price*0,20)).toFixed(2).replace(".",",")}</p>
<p className={styles.price_dicount}>Por R$ {product?.price?.toFixed(2).replace(".",",")}</p>
<div className={styles.buttons}>
<button 

className={styles.button}
 onClick={()=> {
  //setOpenCart(true)
  let index = cart.findIndex((item: any) => item.id == product.id)
  let cartCopy = [...cart]
  if (index != -1) {
  cartCopy[index].quantity = cartCopy[index]?.quantity ? cartCopy[index].quantity + 1 : 1+1
  }else {
    product.quantity = 1
  }
  cart.filter((item: any) => item.id == product.id).length == 0 ? 
  setCart([product]) 
  : setCart(cartCopy)
  
  if (typeof window !== 'undefined'  ) {
    let a = localStorage.getItem('cart') as any
    if (a == null) {
      a = [...cart, product]
    } else {
      a = [...a, product]
    }
 
 
  }

 
    window.location.href = "/cartpage"

   
}}

>Comprar</button>
<button className={styles.button_brown}>
          <Favorite sx={{color: "#fff", width: "100%"}} />
        </button>
        <button className={styles.button_brown}
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
        }}
        >
          <ShoppingCart sx={{color: "#fff",width: "100%"}} />
        </button>
        </div>
        <div className={styles.frete}>
        <input className={styles.cep} placeholder='Digite seu CEP' type="text" />
        <button className={styles.button_brown}>
         <Search sx={{color: "#fff",width: "100%"}}   />
        </button></div>
</span>


</span>


<p className={styles.description} style={{marginLeft: "10%"}}>
{product.description}
</p>
</div>



<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    
    <div className={styles.modalselecaddres} >
    <fieldset>

    <h1 style={{textAlign: "center"}}>Selecione um endereço</h1>
    <Button style={{marginLeft: "10%", marginBottom: "20px", float: "right"}} 
    onClick={handleOpenModalCreateAdrress} variant="contained" color="success">Novo endereço</Button>
    <div className={styles.address}>

    {addresses.map((item: any) => {
      return (
    <label key={item.id}  htmlFor={item.id} className={styles.address1}
    style={addressId == item.id ? styleLabel.radioButtonLabelChecked : styleLabel.radioButtonLabel}>
    <input type="radio" hidden onChange={()=> {setAddressId(item.id)}} name='address'  id={item.id} />
    <p style={addrespinput}>Rua: {item.address}</p>
    <p style={addrespinput}>Bairro: Bairro 1</p>
    <p style={addrespinput}>Cidade: Cidade 1</p>
    <p style={addrespinput}>Estado: Estado 1</p>
    <p style={addrespinput}>País: País 1</p>
    </label>
      )})}
{  addresses.length == 0 && <p style={{textAlign: "center"}}>Nenhum endereço cadastrado</p>}
    
    </div>
    </fieldset>

    <Button 
    style={{marginLeft: "10%", marginTop: "20px", float: "right"}} 
    onClick={checkout}
    variant="contained" color="success">Continuar</Button>
    </div>
  </Box>
</Modal>


<Modal
  open={openModalCreateAdrress}
  
  onClose={handleCloseModalCreateAdrress}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style} >
    <div className={styles.modalcreateaddress}>

   
    <h1 style={{textAlign: "center"}}>Criar endereço</h1>
   <input style={styleInput} onChange={(e) => {setAddress(e.target.value)}}  type="text"  placeholder='endereço'/>
   <input style={styleInput} onChange={(e) => {setNeighborhood(e.target.value)}} type="text"  placeholder='Bairro'/>
   <input style={styleInput} onChange={(e) => {setCity(e.target.value)}} type="text"  placeholder='Cidade'/>
   <input style={styleInput} onChange={(e) => {setState(e.target.value)}} type="text"  placeholder='Estado'/> 
   <input style={styleInput} onChange={(e) => {setCountry(e.target.value)}} type="text"  placeholder='País'/> 
   <input style={styleInput} onChange={(e) => {setNumber(e.target.value)}} type="text"  placeholder='Número'/> 
   <input style={styleInput} onChange={(e) => {setCep(e.target.value)}} type="text"  placeholder='CEP'/> 
    <input style={styleInput} onChange={(e) => {setComplement(e.target.value)}} type="text"  placeholder='Complemento'/>
   <Button 
   style={{float: "right", marginTop:"10px"}} 
    onClick={createAddress}
   variant="contained" color="success">Cadastrar</Button>
   </div>
  </Box>
</Modal>

</CartContext.Provider>

    </div>
  )
}

