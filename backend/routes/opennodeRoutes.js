const express = require("express");
const opennodeConstroller = require("../controllers/opennodeController");
const router = express.Router();

router.post(
    "/createPaymentRequest/:user_id",
    opennodeConstroller.createPaymentRequest
);
router.post("/pay/:user_id", opennodeConstroller.handleIncomingInvoice);
router.post("/withdraw/:user_id", opennodeConstroller.handleIncomingInvoice);

module.exports = router;
