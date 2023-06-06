import React, { useEffect } from 'react';
import Header from '@/components/header/index';

 //import { Container } from './styles'
import { Box, Button, Chip, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography,} from '@mui/material';
import Paper from '@mui/material/Paper';
import api from '@/components/api';

import {CircularProgress} from '@mui/material';
import { AttachMoney } from '@mui/icons-material';



      interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
      }


      function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
        
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <div>{children}</div>
              </Box>
            )}
          </div>
        );
      }

      function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

const Profile: React.FC = () => {
    const [orders, setOrders] = React.useState([]) as any
    const [value, setValue] = React.useState(0);
    const [ordersSub, setOrdersSub] = React.useState([]) as any
    const [loading, setLoading] = React.useState(false) as any
    useEffect(() => {
        api.get("/order").then((response) => {
           setOrders(response.data)
        })
        api.get("/signature/orders/findMany").then((response) => {

            setOrdersSub(response.data)
        }).catch((err) => {
            console.log(err)
        })



    }, [])
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    function pay(id: string) {
        api.post("/signature/orders/pay", { id: id }).then((response) => {
            console.log(response.data)
          window.location.href = response.data
        }).catch((err) => {
            console.log(err)
        })
    }

    function payProduct(order: any ){
      api.post("/order/pay", { order: order}).then((response) => {
        console.log(response.data)
        window.location.href = response.data
      }).catch((err) => {
          console.log(err)
      }
      )
    }

  return (
  //<Container>
  <>  
  <Header />



      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '80%', margin: "0 auto"}}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    
    <Tab label="assinaturas" {...a11yProps(1)} />
    <Tab label="Produtos" {...a11yProps(0)} />
    <Tab label="kits" {...a11yProps(2)} />
  </Tabs>
</Box>

<TabPanel value={value} index={0}>
<TableContainer component={Paper} sx={{ maxWidth: "90%", margin: "0 auto" }}>
        <Table sx={{ minWidth: 650, }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Assinatura</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Horário</TableCell>
              <TableCell align="center">Horário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            { ordersSub.length > 0 ? ordersSub?.map((row: any) => {
              let color = "#1ba11bd8" as string;
              if (row.status == "aguardando pagamento") {
                color = "#bd1e1ec0";
              }


              return (
                <TableRow
                  key={row.id}
                >
                  <TableCell component="th" scope="row">
                    {row.signature.title}
                  </TableCell>
                 
                  <TableCell align="center">R$ {row.signature.price.toFixed(2).replace(".", ",")}</TableCell>
                  <TableCell align="center"><Chip label={row.status} color="success" style={{ background: color }} /></TableCell>
                  <TableCell align="center">{new Date(row.createdAt).toLocaleDateString("pt-BR") + " " + new Date(row.createdAt).toLocaleTimeString("pt-BR")}</TableCell>
                  <TableCell align="center">
                    {row.status == "aguardando pagamento" ? 
                    <Button onClick={(e: any) => {pay(row.paymentId);
                      setLoading(true)
                    }} variant='contained' color='error' >
                    {loading ? <CircularProgress  color="warning" sx={{color: "white", width: "40px"}} /> :  'Pagar'} </Button> : 

                    <Button variant='contained' onClick={(e: any) => {//pay(row.paymentId);
                      setLoading(true)
                    }} color='success' > {loading ? <CircularProgress  color="warning" sx={{color: "white", width: "40px"}} /> :  'Status'}</Button>}
                   </TableCell>
                </TableRow>
              );
            }) : ""}
          </TableBody>
        </Table>
      </TableContainer>
</TabPanel>

<TabPanel value={value} index={1}>
  
      <TableContainer component={Paper} sx={{ maxWidth: "90%", margin: "0 auto" }}>
        <Table sx={{ minWidth: 650, }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Horário</TableCell>
              <TableCell align="center">Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {orders.map((row: any) => {
              let color = "#1ba11bd8" as string;
              if (row.status == "aguardando pagamento") {
                color = "#bd1e1ec0";
              }


              return (
                <TableRow
                  key={row.id}
                >
                  <TableCell component="th" scope="row">
                    {row.product.name}
                  </TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">R$ {row.product.price.toFixed(2).replace(".", ",")}</TableCell>
                  <TableCell align="center"><Chip label={row.status} color="success" style={{ background: color }} /></TableCell>
                  <TableCell align="center">{new Date(row.createdAt).toLocaleDateString("pt-BR") + " " + new Date(row.createdAt).toLocaleTimeString("pt-BR")}</TableCell>
                  <TableCell align="center">
                    {row.status == "aguardando pagamento" ? 
                    <Button onClick={() => {payProduct(row)}}  variant="contained"> <AttachMoney />  Pagar</Button> 
                    : <Button variant="contained" disabled>Pagar</Button>}
                    </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
</TabPanel>

<TabPanel value={value} index={2}>
<TableContainer component={Paper} sx={{ maxWidth: "90%", margin: "0 auto" }}>
        <Table sx={{ minWidth: 650, }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Produgo</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Horário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {orders.map((row: any) => {
              let color = "#1ba11bd8" as string;
              if (row.status == "aguardando pagamento") {
                color = "#bd1e1ec0";
              }


              return (
                <TableRow
                  key={row.id}
                >
                  <TableCell component="th" scope="row">
                    {row.product.name}
                  </TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">R$ {row.product.price.toFixed(2).replace(".", ",")}</TableCell>
                  <TableCell align="center"><Chip label={row.status} color="success" style={{ background: color }} /></TableCell>
                  <TableCell align="center">{new Date(row.createdAt).toLocaleDateString("pt-BR") + " " + new Date(row.createdAt).toLocaleTimeString("pt-BR")}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
</TabPanel>
</>

   //</Container>
    );
}

export default Profile;