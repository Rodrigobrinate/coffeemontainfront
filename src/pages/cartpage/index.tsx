import React, { useEffect, useState } from 'react';
import Header from '@/components/header/index';
 //import { Container } from './styles';
 import styles from './styles.module.css'
import { SERVER_URL } from '@/service/constants/URLs';
import { Box, Button, Divider, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import api from '@/components/api';
import { ArrowRight, Delete, KeyboardDoubleArrowRight, People, PhoneAndroid } from '@mui/icons-material';
import AddressModal from '@/components/addressModal';
import { cpf } from 'cpf-cnpj-validator'; 
import validator from 'validator';


const addrespinput = {
    width: "40%", 
    padding:"0px",
    margin: "0px", 
    fontSize: ".8rem"} as any

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

      const styleInput = {
        marginLeft: "10%", 
        marginTop: "10px", 
        padding: "10px", 
        borderRadius: "5px", 
        border: "1px solid black"}
      
     

const Cartpage: React.FC = () => {
    const [cart, setCart] = React.useState([]) as any
    const [total, setTotal] = React.useState(0) as any
    const [addresses, setAddresses] = React.useState([]) as any
    const [addressSelected, setAddressSelected] = React.useState(addresses[0]) as any
    const [addressModal, setAddressModal] = React.useState([]) as any
    const [open, setOpen] = React.useState(false) as any
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [addressId, setAddressId] = React.useState(0) as any
    const [openModalCreateAdrress, setOpenModalCreateAdrress] = useState(false);
    const [address, setAddress] = useState("") as any
    const [cep, setCep] = useState("") as any
    const [number, setNumber] = useState("") as any
    const [complement, setComplement] = useState("") as any
    const [neighborhood, setNeighborhood] = useState("") as any
    const [city, setCity] = useState("") as any
    const [state, setState] = useState("") as any
    const [country, setCountry] = useState("") as any
    const [phone, setPhone] = useState("") as any
    const [cpfn, setCpf] = useState("") as any
    const [login, setLogin] = useState(true) as any


    useEffect(() => {
        console.log('teste')
         if (typeof window !== 'undefined'  ) {
             //setCart([localStorage.getItem('cart') as string])
            setCart(JSON.parse(localStorage.getItem('cart') as string))
            // console.log(JSON.parse(b))
         } 

         api.get("/address").then((response) => {
            setAddresses(response.data)
            setAddressSelected(response.data[0])
          }).catch((error) => {
            if (error.response.status == 401) {
              setLogin(false)
            }})

          api.get("/user").then((response) => {
            if (response.data.phone != null) {
            setPhone(response.data.phone)
            }
            if (response.data.cpf != null) {
            setCpf(response.data.cpf)
          }
          })


     }, [])

     useEffect(() => {
        setTotal(0);
        let total2 = 0;
        cart.map((item: any, i: number) => {
          console.log(cart[i - 1]?.id, item.id);
          if (cart[i - 1]?.id != item.id) {
            total2 = total2 + item.price * item.quantity;
          } else {
            if (item.quantity > 0) {
              total2 = item.price * item.quantity;
            } else {
              total2 = total2 + item.price;
            }
          }
          if (i == cart.length - 1) {
            setTotal(total2);
          }
        });


        if (typeof window !== 'undefined'  ) {
          //setCart([localStorage.getItem('cart') as string])
          console.log(cart)
          if (cart.length > 0){

          
           localStorage.setItem('cart', JSON.stringify(cart))}
         // console.log(JSON.parse(b))
      }
      


        
      }, [cart]);



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
          setOpenModalCreateAdrress(false)
          api.get("/address").then((response) => {
            setAddresses(response.data)
              
          })
        }).catch((error) => {
          console.log(error)
          
        })
        
        } 



        function checkout() {
          api.post("/order/checkout", {
            addressId: addressSelected.id,
            items: cart, 
            phone: phone,
            cpf: cpfn
          }).then((response) => {
            localStorage.setItem('cart', JSON.stringify([]))
            
            window.location.href = response.data
          }).catch((error) => {
            console.log(error)
            
          })
          
          }




  return (
    <div className={styles.container}>
        <Header/>
{addressModal}
        <div className={styles.items}>

          {cart.length > 0 ? <h1>Meu carrinho</h1> : <h1>Carrinho vazio</h1>}

        {cart.map((item: any, i: number) => {
            return (
              <><Divider variant="middle" />
                <div key={i} className={styles.item}>
                  
                 <img className={styles.img} src={SERVER_URL+"/uploads/"+item.image[0]?.url} alt=""/>
                    <div className={styles.info}>
                      <span className={styles.span}>
                        <h1 className={styles.h1} >{item.name}</h1>
                        <div onClick={() => {
                    setTotal(total - item.price);
                    let cartCopy = [...cart];
                    let index = i;
                    if (index != -1) {
                      cartCopy[index].quantity = cartCopy[index]?.quantity
                        ? cartCopy[index].quantity - 1
                        : null;
                      if (
                        cartCopy[index].quantity == 0 ||
                        cartCopy[index].quantity == null
                      ) {
                        cartCopy.splice(index, 1);
                        console.log(index);
                      }
                    }

                    setCart(cartCopy);
                  }} >
                        <Delete /></div>
</span>
                <span className={styles.span}>
                        <h3 className={styles.h3}>{item.description.slice(0,50)}</h3>

                        <h3 className={styles.h3} >x{item.quantity}</h3></span>
                         <h2 className={styles.h2}>R$ {item.price.toFixed(2).replace(".", ",")}</h2>
                    </div>
                    
                </div></>
        )})}
        </div>


<h4>Endereço</h4>
{addresses.length > 0 ? <>
<div className={styles.address} onClick={() => { setOpen(true) }}>
    <span>
   
        <p className={styles.address_item}> {addressSelected?.street} -  {addressSelected?.neighborhood} - {addressSelected?.number}</p>
        <p className={styles.address_item}>{ addressSelected?.city} -  { addressSelected?.state} - { addressSelected?.zipCode.slice(0, 5) +" - "+addressSelected?.zipCode.slice(5, 8)} </p></span>
<KeyboardDoubleArrowRight sx={{color: "#c6c6c6"}} />
</div>

<br /><br />

<div className={styles.data}>
<TextField id="outlined-basic"  
onChange={(e) => {setPhone(e.target.value)}}
error={validator.isMobilePhone(phone, "pt-BR") ? false : true}
value={phone}
required
InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneAndroid />Telefone</InputAdornment>,
          }} fullWidth  label="Telefone" size='medium' variant="outlined" /> 
  
  <br />
  <br />

  <TextField id="outlined-basic"
  onChange={(e) => {setCpf(e.target.value)}}
  value={cpfn}
  required
  error={cpf.isValid(cpfn) ? false : true}
  InputProps={{
            startAdornment: <InputAdornment position="start"><People />CPF</InputAdornment>,
          }} fullWidth  label="CPF" size='medium' variant="outlined" />
</div>


<br/>
<div style={{float: "right"}} >
<p>Total: R$ {total.toFixed(2).replace(".", ",")}</p>
<Button variant="contained" color="success" onClick={checkout} disabled={cart.length > 0 && cpf.isValid(cpfn) && validator.isMobilePhone(phone, "pt-BR")?  false : true} >
  concluir pedido 
</Button>

</div>
</>
:  <Button variant="contained" color="success" onClick={() => {setOpenModalCreateAdrress(true); }}>adcionar endereço</Button>}

        


<Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        onClose={() => setOpen(false)}
        open={open}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            position: 'relative',
            width: '80%',
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >


<div className={styles.modalselecaddres}>
    <fieldset>

    <h1 style={{textAlign: "center"}}>Selecione um endereço</h1>
    <Button style={{marginLeft: "10%", marginBottom: "20px", float: "right"}} 
    onClick={() => {setOpenModalCreateAdrress(true); }}
    variant="contained" color="success">Novo endereço</Button>
    <div className={styles.addresses}>

    {addresses.map((item: any) => {
      return (
    <label key={item.id}  htmlFor={item.id} className={styles.address1}
    style={addressId == item.id ? styleLabel.radioButtonLabelChecked : styleLabel.radioButtonLabel}>
    <input type="radio" hidden onChange={()=> {setAddressSelected(item); setAddressId(item.id)}} name='address'  id={item.id} />
    <p style={addrespinput}>Rua: {item.street}</p>
    <p style={addrespinput}>Bairro: {item.neighborhood}</p>
    <p style={addrespinput}>Cidade: {item.city}</p>
    <p style={addrespinput}>Estado: {item.state}</p>
    <p style={addrespinput}>País: {item.country}</p>
    <p style={addrespinput}>Núemro: {item.number}</p>
    </label>
      )})}
{  addresses.length == 0 && <p style={{textAlign: "center"}}>Nenhum endereço cadastrado</p>}
    
    </div>
    </fieldset>

    <Button 
    style={{marginLeft: "10%", marginTop: "20px", float: "right"}} 
    onClick={() => {setOpen(false)}}
    variant="contained" color="success">Continuar</Button>
    </div>
         
        </Box>
      </Modal>



      <Modal
  open={openModalCreateAdrress}
  
  onClose={() => {setOpenModalCreateAdrress(false)}}
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




<Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        onClose={() => setOpen(false)}
        open={!login ? true : false}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: 'flex',
          p: 1,
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            position: 'relative',
            width: '80%',
            bgcolor: 'background.paper',
            height: '80%',
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >

        </Box>
      </Modal>


    </div>

  );
}

export default Cartpage;