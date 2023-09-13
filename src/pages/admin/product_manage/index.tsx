import Image from 'next/image'
import { Inter } from '@next/font/google'
//import { Container } from './styles'
import styles from './styles.module.css'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import api from '@/components/api';
import {  toast } from 'react-toastify';
import { Delete, Edit } from '@mui/icons-material';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';





const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Home() {
  const [products, setProducts] = useState([]) as any
  const [signatures, setSignatures] = useState([]) as any
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const handleOpenDeleteProduct = () => setOpenDeleteProduct(true);
  const handleCloseDeleteProduct = () => setOpenDeleteProduct(false);
  const [productId, setProductId] = useState(0);
  const [openDeleteSignature, setOpenDeleteSignature] = useState(false);
  const handleOpenDeleteSignature = () => setOpenDeleteSignature(true);
  const handleCloseDeleteSignature = () => setOpenDeleteSignature(false);
  const [signatureId, setSignatureId] = useState(0);
  const [kits, setKits] = useState([]) as any


useEffect(() => {
  api.get("/product").then((response) => {
    setProducts(response.data)
  })

  api.get("/signature").then((response) => {
    setSignatures(response.data)
  }).catch((err) => {
    toast.error("erro ao carregar assinaturas")
  })

  api.get("/kit").then((response) => {
    setKits(response.data)
  }
  ).catch((err) => {
    toast.error("erro ao carregar kits")
  }
  )

},[])

function deleteProduct(){
  api.delete("/product/"+productId).then((response) => {
    toast.success("Produto deletado com sucesso")
    handleCloseDeleteProduct()
    api.get("/product").then((response) => {
      setProducts(response.data)
    })
  }).catch((err) => {
    toast.error("erro ao deletar produto")
  })

}

function deleteSignature(){
  api.delete("/signature/"+signatureId).then((response) => {
    toast.success("Assinatura deletada com sucesso")
    handleCloseDeleteSignature()
    api.get("/signature").then((response) => {
      setSignatures(response.data)
    })
  }).catch((err) => {
     console.log(err)
  })

}



  return (
    <div className={styles.container} >
     

      <h1>Produtos</h1>
   <Box
      sx={{
        width: "calc(100%)",
        height: 400,
        border: 1,
        marginBottom: 10,
        borderBlockColor: "gray",
        borderRadius: 2,
        overflowY: 'scroll'
        
      }}
    >
 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Preço</TableCell>
            <TableCell align="center">Categoria</TableCell>
            <TableCell align="center">Imagens</TableCell>
            <TableCell >Editar</TableCell>
            <TableCell >Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row: any) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.category.name}</TableCell>
              <TableCell align="center"><a href="">ver</a></TableCell>
              <TableCell ><Button variant="contained" 
              onClick={() => {//handleOpenEdit(); setIdFeature(row.id); setTitleEdit(row.name); setTypeEdit(row.type)
              }} 
              startIcon={<Edit />} color="warning">Editar</Button></TableCell>
              <TableCell ><Button variant="contained" 
              onClick={() => {handleOpenDeleteProduct(); setProductId(row.id)
              }} startIcon={<Delete />} color="error">Deletar</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Box>
    
        <h1>Assinaturas</h1>
        <Box
      sx={{
         width: "calc(100%)",
        height: 300,
        marginBottom: 10,
        border: 1,
        borderBlockColor: "gray",
        borderRadius: 2,
        
      }}
    >
 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Preço</TableCell>
            <TableCell align="center">pontos</TableCell>
            <TableCell >Editar</TableCell>
            <TableCell >Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {signatures.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center"><a href={"/admin/signature/"+row.id}>Ver</a></TableCell>
              <TableCell ><Button variant="contained" 
              onClick={() => {//handleOpenEdit(); setIdFeature(row.id); setTitleEdit(row.name); setTypeEdit(row.type)
              }} 
              startIcon={<Edit />} color="warning">Editar</Button></TableCell>
              <TableCell ><Button variant="contained" 
              onClick={() => {handleOpenDeleteSignature(); setSignatureId(row.id)
              }} startIcon={<Delete />} color="error">Deletar</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Box>
    <Box
      sx={{
         width: "calc(100%)",
        height: 300,
        marginBottom: 10,
        border: 1,
        borderBlockColor: "gray",
        borderRadius: 2,
        
      }}
    >

      <h1>Kits</h1>
 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell >Preço</TableCell>
            <TableCell >Produtos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {kits.map((row:any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >R$ {row.price.toFixed(2).replace("." , ",")}</TableCell>
              <TableCell ><a href="">ver</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </Box>


    <Dialog
        open={openDeleteProduct}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteProduct}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Você tem certeza que deseja deletar essa assinatura?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ao deletar essa assinatura, você não poderá recuperá-la.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteProduct}>Cancelar</Button>
          <Button onClick={deleteProduct}>Deletar</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openDeleteSignature}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteSignature}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Você tem certeza que deseja deletar essa feature?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ao deletar essa feature, você não poderá recuperá-la.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteSignature}>Cancelar</Button>
          <Button onClick={deleteSignature}>Deletar</Button>
        </DialogActions>
      </Dialog>





    </div>
  )
}
