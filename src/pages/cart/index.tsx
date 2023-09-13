import React, { useContext, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//import { Container } from "./styles";
import styles from "./styles.module.css";
import CartContext from "../home/CartContext";
import { SERVER_URL } from "@/service/constants/URLs";
import { Close, Co2Sharp, Delete } from "@mui/icons-material";
import { Button } from "@mui/material";

const Cart = (props: { open: boolean; cart: any }) => {
  const { open } = props;

  const { openCart, setOpenCart, cart, setCart } = useContext(
    CartContext
  ) as any;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [total, setTotal] = React.useState(0) as any;
  //const [cart, setCart] = React.useState([]) as any

  useEffect(() => {
    console.log("teste");
    if (typeof window !== "undefined") {
      //setCart([localStorage.getItem('cart') as string])
      let b = localStorage.getItem("cart") as string;
      // console.log(JSON.parse(b))
    }
  }, []);

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
  }, [cart]);

  return (
    <div className={ openCart ? `modal ${styles.container} ` : `modal ${styles.none} ${styles.container}`}>
      <div className={openCart ? "modal" : `modal ${styles.none}`}>
        <span
          onClick={() => {
            setOpenCart(false);
          }}
        >
          <Close sx={{ float: "right" }} />
        </span>
        <h3>Carrinho</h3>

        {cart?.map((item: any, i: number) => {
          console.log(cart);
          return (
            <div key={i} className={styles.item}>
              <img className={styles.img} src={SERVER_URL + "/uploads/" + item.image[0]?.url} alt="" />
              <div className={styles.div1}>
                <p ><strong>{item?.name.slice(0, 50)} ...</strong></p>
                <p>{item?.description.slice(0, 50)}...</p>
              </div>
              <div className={styles.div2}>
                <div
                  onClick={() => {
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
                  }}
                >
                  <Delete color="error" />
                </div>
                <p className={styles.price}>
                  R$ {item?.price.toFixed(2).replace(".", ",")}
                </p>
                <p style={{margin: 0}}>{item?.quantity}</p>
              </div>
            </div>
          );
        })}

        <div className={styles.total}>{total.toFixed(2).replace(".", ",")}</div>

        <Button variant="contained" color="success" href="/cartpage">
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default Cart;

function usesEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
