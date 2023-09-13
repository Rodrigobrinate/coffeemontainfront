
//import { Container } from "./styles";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import api from "@/components/api";
import { useEffect, useState } from "react";
import { Image } from "@mui/icons-material";





export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("");
  const [productsSelected, setProductsSelected] = useState([])
  const [prodcts, setProdcts] = useState([]) as any;

  function create() {
    
    productsSelected.map((product: any, i: number) => {
      setProdcts([...prodcts, product.id])
      if (i == productsSelected.length - 1) {
        api
          .post("/kit", {
            title: title,
            description: description,
            price: price,
            
            products: prodcts,
          })
          .then((response) => console.log(response));
      }

    })


      

      console.log(search)
  }

  useEffect(() => {
    api.get("/product").then((response) => {
      setProducts(response.data)
    })
  }, []);


  

  function searchProduct(text: string) {
    api.get("/product/search/"+text).then((response) => {
      console.log(products);
    
    });
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "15vw" },
        }}

        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="Tilulo do produto"
          defaultValue=""
          onChange={(e)=> {setTitle(e.target.value)}}
        />

        <TextField
          required
          id="outlined-required"
          label="Descrição do produto"
          defaultValue=""
          onChange={(e)=> {setDescription(e.target.value)}}
        />
        <TextField
          required
          type={"number"}
          id="outlined-required"
          label="valor do protudo"
          defaultValue=""
          onChange={(e)=> {setPrice(e.target.value)}}
        />

        <Button
          variant="contained"
          startIcon={<Image />}
          size="large"
          component="label"
        >
          Imagens
          <input
            hidden
            type="file"
            multiple
            className="images"
            accept="image/*"
            name=""
            id=""
          />
        </Button>

        <Autocomplete
  multiple
  limitTags={2}
  id="multiple-limit-tags"
  options={products}
  getOptionLabel={(option:any) => {
    return option.name}}
  defaultValue={[]}
  onChange={(e, value:any) => {setProductsSelected(value)}}
  renderInput={(params) => (
    <TextField {...params} onChange={(e) => {setSearch(e.target.value); searchProduct(e.target.value); console.log(e.target.value, params)}} label="Produtos" placeholder="Favorites" />
  )}
  sx={{ width: '500px' }}
/>

        <Button
          variant="contained"
          onClick={create}
          color="success"
          size="large"
        >
          Cadastrar
        </Button>
      </Box>
    </>
  );
}
