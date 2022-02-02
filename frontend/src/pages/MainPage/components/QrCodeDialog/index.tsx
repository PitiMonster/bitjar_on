import React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import Dialog from "@mui/material/Dialog";

const QRCode = require("qrcode.react");

const QrCodeDialog: React.FC<{
  qrcodeData: string;
  open: boolean;
  title: string;
  onClose: () => void;
}> = ({ qrcodeData, open, title, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{textAlign: 'center'}}>{title}</DialogTitle>
      <DialogContent>
        <QRCode value={qrcodeData} />
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeDialog;
