import React, { useState, useEffect } from "react";
import { Button, TextField, Modal, Box } from "@mui/material";

import axios from "axios";

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

const EditHastaModal = (props) => {
  const {
    open,
    handleClose,
    hasta,
    hastalar,
    updateComponent,
    setUpdateComponent,
  } = props;
  const [name, setName] = useState(hasta?.name);
  const [hasNameError, setHasNameError] = useState(false);
  const [surname, setSurname] = useState(hasta?.surname);
  const [hasSurnameError, setHasSurnameError] = useState(false);
  const [phone, setPhone] = useState(hasta?.phone);
  const [hasPhoneError, setHasPhoneError] = useState(false);
  const [phoneErrorMessage,setPhoneErrorMessage]=useState("")

  useEffect(() => {
    setName(hasta?.name);
    setSurname(hasta?.surname);
    setPhone(hasta?.phone);
  }, [hasta]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "") {
      setHasNameError(true);
      setTimeout(() => {
        setHasNameError(false);
      }, 3000);
      return;
    }
    if (surname === "") {
      setHasSurnameError(true);
      setTimeout(() => {
        setHasSurnameError(false);
      }, 3000);
      return;
    }
    if (phone === "") {
      setHasPhoneError(true);
      setPhoneErrorMessage("*Telefon alanı zorunludur ve 11 haneli olmalıdır")
      setTimeout(() => {
        setHasPhoneError(false);
        setPhoneErrorMessage("")
      }, 3000);
      return;
    }
    if (phone.length !== 11) {
        setHasPhoneError(true);
        setPhoneErrorMessage("*Telefon alanı 11 haneli olmalıdır")
        setTimeout(() => {
          setHasPhoneError(false);
          setPhoneErrorMessage("")
        }, 3000);
      return;
    }
    const filteredHastalar = hastalar.filter(
      (item) => item.phone !== hasta.phone
    );
    const hasNumber = filteredHastalar.find((hasta) => hasta.phone === phone);

    if (hasNumber !== undefined) {
      alert("Bu numarayla kayıtlı bir hasta zaten vardır!");
      return;
    }
    const updatedHasta = {
      ...hasta,
      name: name,
      surname: surname,
      phone: phone,
    };
    axios
      .put(`http://localhost:3004/hastalar/${hasta.id}`, updatedHasta)
      .then((response) => {
        handleClose();
        setUpdateComponent(!updateComponent);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h1 style={{ textAlign: "center" }}>Hasta Düzenle</h1>
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
                label="Hasta Adı"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {hasNameError && (
                <p>
                  <small style={{ color: "orangered" }}>
                    *İsim alanı zorunludur
                  </small>
                </p>
              )}
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
                label="Hasta Soyadı"
                variant="outlined"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
              {hasSurnameError && (
                <p>
                  <small style={{ color: "orangered" }}>
                    *Soyisim alanı zorunludur
                  </small>
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: "center",
                margin: "20px 0px",
              }}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Telefon Numarası"
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              {hasPhoneError && (
                <p>
                  <small style={{ color: "orangered" }}>
                    {phoneErrorMessage}
                  </small>
                </p>
              )}
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

export default EditHastaModal;
