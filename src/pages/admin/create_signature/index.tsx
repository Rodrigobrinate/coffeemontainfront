import Image from 'next/image'
import { Inter } from '@next/font/google'
//import { Container } from './styles'
import { Box, Button, TextField } from '@mui/material'
import api from '@/components/api'
import { toast } from 'react-toastify'
import { useState } from 'react'


export default function Home() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [color, setColor] = useState('')


  function create() {
    api.post("/signature/create",{
        title: title,
        description: description,
        price: price,
        color: color
    },).then((response) => {
        toast.success("assinatura cadastrada com sucesso")
    }).catch((err) => { 
      toast.error("erro ao cadastrar assinatura")
    })
  }



  return (
    < >
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '15vw' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
      noValidate
      autoComplete="off"
    >

<TextField
          required
          id="outlined-required"
          label="Tilulo da assinatura"
          defaultValue=""
          onChange={(e)=> {setTitle(e.target.value)}}
        />

<TextField
          required
          id="outlined-required"
          label="Descrição da assinatura"
          defaultValue=""
          onChange={(e)=> {setDescription(e.target.value)}}
        />
        <TextField
          required
          type={'number'}
          id="outlined-required"
          label="valor da assinatura"
          defaultValue=""
          onChange={(e)=> {setPrice(e.target.value)}}
        />

<label htmlFor="">selecione uma cor</label>
        <input type="color" onChange={(e)=> {setColor(e.target.value)}} />
        <br />
       
       <Button variant="contained" onClick={create} color="success" size="large">
          Cadastrar
        </Button>

    </Box>
    </>
  )
}
