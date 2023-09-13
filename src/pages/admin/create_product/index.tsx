//import Image from 'next/image'
import { Inter } from "@next/font/google";
//import { Container } from "./styles";
import styles from "./styles.module.css";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import api from "../../../components/api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [images, setImages] = useState([]) 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  function create() {
    if (images.length > 10) {
      toast.error("Você pode enviar no máximo 10 imagens");
    } else if (title == "" || description == "" || price == "") {
      toast.error("Você deve preencher todos os campos");
    } else {
      api
        .post("/product/create", {
          name: title,
          description: description,
          price: price,
          category: 1,
        })
        .then((response) => {
          const formData = new FormData();
          for (const key in images) {
            console.log(images[key]);
            formData.append(`files`, images[key]);
          }
          api
            .post("/images/upload/" + response.data.id, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              console.log(response);
              toast.success("produto cadastrado com sucesso");
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  }
  function onInitImageChange(e: any) {
    let a = images as any;
    a.push(e.target.files);
    setImages(e.target.value);
    const element = document.querySelector(".images") as any;
    console.log(element.files);

    for (const key in element.files) {
      console.log(`${key}: ${element.files[key].name}`);
    }

    setImages(element.files);
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "15vw" },
          "& button": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="Tilulo do produto"
          defaultValue=""
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <TextField
          required
          id="outlined-required"
          label="Descrição do produto"
          defaultValue=""
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          required
          type={"number"}
          id="outlined-required"
          label="valor do protudo"
          defaultValue=""
          onChange={(e) => {
            setPrice(e.target.value);
          }}
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
            onChange={onInitImageChange}
            name=""
            id=""
          />
        </Button>

        <Button
          variant="contained"
          onClick={create}
          color="success"
          size="large"
        >
          Cadastrar
        </Button>
      </Box>
    </div>
  );
}
