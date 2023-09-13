import React, { useEffect } from 'react';
import Header from '@/components/header/index';

 //import { Container } from './styles'
import { Box, Button, Chip, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,} from '@mui/material';
import Paper from '@mui/material/Paper';
import Tabs from '@/components/Tabs';
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


    <Tabs />
      
</>

   //</Container>
    );
}

export default Profile;