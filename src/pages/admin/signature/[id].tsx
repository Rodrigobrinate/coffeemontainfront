import React, { useEffect } from 'react';

 //import { Container } from './styles';
import api from '@/components/api';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Slide, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Delete, Edit } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Signature: React.FC = () => {
  const [signatures, setSignatures] = React.useState([]) as any
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const [type, setType] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [idFeature, setIdFeature] = React.useState(0);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit= () => setOpenEdit(false);
  const [typeEdit, setTypeEdit] = React.useState('');
  const [titleEdit, setTitleEdit] = React.useState('');

  

  const router = useRouter()
  const { id } = router.query
  
    useEffect(() => {
        start()
    }, [id])

    function start(){
      api.get("/signature/"+id).then((response) => {
            setSignatures(response.data)
          }).catch((err) => {
            //toast.error("erro ao carregar assinaturas")
          })
    }



    const handleChange = (event: SelectChangeEvent) => {
      setType(event.target.value as string);
    };

    const handleChangeEdit = (event: SelectChangeEvent) => {
      setTypeEdit(event.target.value as string);
    };

    


    function create(){
      api.post("/features", {
        name: title,
        type: type,
        subscriptionId: id
      }).then((response) => {
        start()
        handleClose()
      }).catch((err) => {
        //toast.error("erro ao carregar assinaturas")
      })
    }


    function editFeature(){
      api.patch("/features/"+idFeature, {
        name: titleEdit,
        type: typeEdit,
      }).then((response) => {
        start()
        handleCloseEdit()
      }).catch((err) => {
        //toast.error("erro ao carregar assinaturas")
      })
    }

    function deleteFeature(){
      api.delete("/features/"+idFeature).then((response) => {
        //window.location.reload()
        start()
        handleCloseDelete()
      }).catch((err) => {
        //toast.error("erro ao carregar assinaturas")
      })
    }
  

  return (
  
    <>

<h1>{signatures.title}</h1>
    <h3 >Features</h3>
<Table sx={{ minWidth: 650, width: "80%", margin: "0 auto" }}  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell >Tipo</TableCell>
            <TableCell >Editar</TableCell>
            <TableCell >Deletar</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {signatures.fatures?.map((row: any) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.name} </TableCell>
              <TableCell ><Chip label={row.type} color="success" style={{background: row.type == "Bom" ? "green" : "red"}} /></TableCell>
              <TableCell ><Button variant="contained" 
              onClick={() => {handleOpenEdit(); setIdFeature(row.id); setTitleEdit(row.name); setTypeEdit(row.type)}} 
              startIcon={<Edit />} color="warning">Editar</Button></TableCell>
              <TableCell ><Button variant="contained" 
              onClick={() => {handleOpenDelete(); setIdFeature(row.id)}} startIcon={<Delete />} color="error">Deletar</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant="contained" onClick={handleOpen} color="success" style={{float: "right", marginTop: "20px"}}>
  Adicionar
</Button>



<Dialog
        open={openDelete}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Você tem certeza que deseja deletar essa feature?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ao deletar essa feature, você não poderá recuperá-la.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancelar</Button>
          <Button onClick={deleteFeature}>Deletar</Button>
        </DialogActions>
      </Dialog>



<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField id="outlined-basic" onChange={(e) => {setTitle(e.target.value)}} label="Título" variant="outlined" />
        <br />
        <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={type}
          onChange={handleChange}
          label="Tipo"
          fullWidth
        >
          
          <MenuItem value={"Bom"}>Bom</MenuItem>
          <MenuItem value={"Ruim"}>Ruim</MenuItem>
        </Select>
        <Button variant="contained" onClick={create} color="success" style={{float: "right", marginTop: "20px"}}> Salvar</Button>
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField id="outlined-basic" onChange={(e) => {setTitleEdit(e.target.value)}} value={titleEdit} label="Título" variant="outlined" />
        <br />
        <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={typeEdit}
          onChange={handleChangeEdit}
          label="Tipo"
          fullWidth
        >
          
          <MenuItem value={"Bom"}>Bom</MenuItem>
          <MenuItem value={"Ruim"}>Ruim</MenuItem>
        </Select>
        <Button variant="contained" onClick={editFeature} color="success" style={{float: "right", marginTop: "20px"}}> Salvar</Button>
        </Box>
      </Modal>
        
    </>

    );
}

export default Signature;