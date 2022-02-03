import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import classes from "./index.module.scss";
import api from "../../api";

import { socket } from "../../utils/websockets";
import QrCodeDialog from "./components/QrCodeDialog";

const MainPage: React.FC = () => {
  const [satsAmount, setSatsAmount] = useState<string>("0");
  const [dialogData, setDialogData] = useState<{
    qrcodeData: string;
    open: boolean;
    title: string;
  }>({ qrcodeData: "", open: false, title: "" });

  const onCloseDialog = () => {
    setDialogData({ qrcodeData: "", open: false, title: "" });
  };

  const handleSubmit = async () => {
    const uniqueId = localStorage.getItem("uniqueId");
    console.log(uniqueId);
    try {
      const resp = await api.post(
        `/opennode/createPaymentRequest/${uniqueId}`,
        {
          satsAmount,
        }
      );
      console.log(resp);
      setDialogData({
        qrcodeData: "lightning:" + resp.data.charge.lightning_invoice.payreq,
        open: true,
        title: "Pay Invoice",
      });
      socket.once("withdraw lnurl", (data) => {
        console.log(data);
        setDialogData({
          qrcodeData: data.uri,
          open: true,
          title: "Save it",
        });
      });
    } catch (err) {
      console.log("create payment request ERROR", JSON.stringify(err));
    }
    // console.log(resp1);
    // const resp2: {
    //   minSendable: number;
    //   maxSendable: number;
    //   callback: string;
    // } = (await api.get(resp1.url)).data;
    // if (checkSatsAmount(resp2.minSendable, resp2.maxSendable)) {
    //   const resp3: { pr: string } = (
    //     await api.get(resp2.callback + `?amount=${satsAmount}`)
    //   ).data;
    //   if (resp3.pr) {
    //     console.log(resp3.pr);
    //     setDialogData({
    //       qrcodeData: resp3.pr,
    //       open: true,
    //       title: "Pay Invoice",
    //     });
    //     socket.once("withdraw lnurl", (data) => {
    //       console.log(data);
    //       setDialogData({
    //         qrcodeData: data.data.encoded,
    //         open: true,
    //         title: "Save it",
    //       });
    //     });
    //   }
    // } else {
    //   // error
    // }
  };

  const checkSatsAmount = (min: Number, max: Number) => {
    if (parseInt(satsAmount) < min || parseInt(satsAmount) > max) {
      // error bit value must be between (min, max)
      return false;
    }
    return true;
  };

  return (
    <div className={classes.container}>
      <p className={classes.title}>Create Withdraw Request</p>
      <Stack sx={{ width: "20vw" }} spacing={5}>
        <TextField
          id="stats-amount-input"
          label="SatsAmount"
          variant="standard"
          value={satsAmount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSatsAmount(event.target.value);
          }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
      <QrCodeDialog {...dialogData} onClose={onCloseDialog} />
    </div>
  );
};

export default MainPage;
