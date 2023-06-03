import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

 //import { Container } from './styles';
 import styles from './styles.module.css'
import { CoffeeOutlined, InboxOutlined, LoginOutlined, Logout, MailOutline, MenuOutlined, People, ShoppingBagOutlined, ShoppingCart } from '@mui/icons-material';
import { Badge, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';

const Header = () => {
  const [decode, setDecode] = useState('') as any
  const [token, setToken] =  useState('') as any
  const [cartCount, setCartCount] = useState(0) as any
  const [state, setState] = React.useState({
    top: false,})
  useEffect(()=> {
    if (typeof window !== 'undefined'  ) {
    // código que usa localStorage
    if (!localStorage.getItem("token") &&  window.location.pathname != "/login"){
       // window.location.href = "/login"
       
    }

    if (localStorage.getItem("token") ){
        setToken(localStorage.getItem('token'))
    setDecode(jwtDecode(localStorage.getItem("token") as string))
    }

    if (localStorage.getItem("cart") ){
      setInterval(() => {
        setCartCount(JSON.parse(localStorage.getItem("cart") as string).length)
      }, 2000);
        
    }


  }
 },[])


 const toggleDrawer =
    (anchor: any, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };



  return (
    <div className={styles.container}>
     
        <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;
      }
    `}</style>
        <Link href='/home'>
<img src="/logo.png" width={'60px'} alt="logo" />
</Link>
<ul className={styles.ul}>
    <li className={styles.li}><Link className={styles.a} href="/home">Produtos</Link> </li>
    <li className={styles.li}><Link className={styles.a} href="/home">Kits especiais</Link></li>
    <li className={styles.li}><Link className={styles.a} href="/signature">Assinatura</Link></li>
    <li className={styles.li}><Link className={styles.a} href="/home">Contato</Link></li>

</ul>

<div className={styles.menu_end} style={{display: "flex", alignItems: "center"}}> 

<Link className={styles.a} href="/cartpage">
<Badge badgeContent={cartCount} color="error">
<ShoppingCart /></Badge>
</Link>
&nbsp;
{!decode ?  <Link className={styles.a} href='/login'>login</Link> : <Link className={styles.a} href='/profile'>{decode.name}</Link>} </div>


<div className={styles.menu_mobile}>
<React.Fragment key={'top'}  >
    <Button onClick={toggleDrawer('top', true)}><MenuOutlined /></Button>
    <Drawer
      anchor={'top'}
      open={state['top']}
      onClose={toggleDrawer('top', false)}
    >       
         
      <List>
      <ListItem sx={{textAlign: "center"}} disablePadding>
            <ListItemButton sx={{display: "flex", justifyContent: "center"}}>
            <img src="/logo.png" width={'60px'} alt="logo" />
             
            </ListItemButton>
          </ListItem>
        {['Produto', 'Kits Especiais', 'Assinatura', 'Carrinho', 'Perfil'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={index == 0
               ? "/home" : index == 1
                ? "/kits" : index == 2
                 ? "/signature" : index == 3
                  ? "/cartpage" : index == 4
                  ? "/profile" : ""}>
              <ListItemIcon>
                {index === 0 ? <CoffeeOutlined /> : ''}
                {index === 1 ? <ShoppingBagOutlined /> : ''}
                {index === 2 ? <CoffeeOutlined /> : ''}
                {index === 3 ? <Badge badgeContent={cartCount} color="error">
<ShoppingCart /></Badge> : ''}
                {index === 4 ? <People /> : ''}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  </React.Fragment>

</div>
    </div>

    );
}

export default Header;