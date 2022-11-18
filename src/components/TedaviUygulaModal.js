import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";

import axios from "axios";

import {useDispatch} from 'react-redux'
import actionTypes from "../redux/actions/actionTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TedaviUygulaModal = (props) => {
  const { open, handleClose,islem } = props;
  const dispatch=useDispatch()
  const [uygulananTedavi,setUygulananTedavi]=useState("")
  const [ilaclar,setIlaclar]=useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    if(uygulananTedavi === "" || ilaclar === ""){
        alert("Tedavi alanı ve İlaçlar alanı boş bırakılamaz")
        return
    }

    const seperatedIlaclar=ilaclar.split(",")


    const updatedIslem={
        ...islem,
        uygulananTedavi: uygulananTedavi,
        yazilanIlaclar:seperatedIlaclar
    }
    axios.put(`http://localhost:3004/islemler/${islem.id}`,updatedIslem)
    .then(res=>{
        setUygulananTedavi("")
        setIlaclar("")
        handleClose()
        dispatch({type:actionTypes.EDIT_ISLEM,payload:updatedIslem})
    })
    .catch(err=>console.log(err))
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h1 style={{ textAlign: "center" }}>Tedavi Ekle</h1>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "20px 0px",
              }}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Uygulanan Tedavi"
                variant="outlined"
                value={uygulananTedavi}
                onChange={(event)=>setUygulananTedavi(event.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "20px 0px",
              }}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Yazılan İlaç"
                variant="outlined"
                value={ilaclar}
                onChange={(event)=>setIlaclar(event.target.value)}
              />
              <p>
                <small style={{ color: "orangered" }}>
                  *İlaçlar arasında mutlaka virgül (,) koyunuz
                </small>
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
                gap: "20px",
              }}>
              <Button onClick={handleClose} variant="outlined" color="error">
                Vazgeç
              </Button>
              <Button type="submit" variant="contained">
                Kaydet
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default TedaviUygulaModal;
