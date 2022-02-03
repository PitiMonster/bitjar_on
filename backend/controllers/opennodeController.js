const opennode = require("opennode");
opennode.setCredentials(process.env.OPENNODE_API_KEY, "dev");

exports.createPaymentRequest = (req, res, next) => {
    // get user_id, amount, description from req.query
    console.log("0");
    const { user_id } = req.params;
    const amount = req.body.satsAmount;
    // create callback_url = <host>/api/v1/opennode/pay&user_id=user_id
    const callback_url = `${req.protocol}://${req.hostname}:8080/api/v1/opennode/pay/${user_id}`;
    // opennode.createCharge
    const charge = {
        description: "My test charge",
        amount, // required
        currency: "USD",
        callback_url,
    };
    console.log("1");
    opennode
        .createCharge(charge)
        .then((charge) => {
            console.log(charge);
            return res.status(200).json({ status: "OK", charge });
        })
        .catch((error) => {
            console.error(`${error.status} | ${error.message}`);
        });
    console.log("2");
};
exports.handleIncomingInvoice = (req, res, next) => {
    console.log("siema invoice");
    // get user_id from req.query
    // get invoice status from req.body
    // if status === unpaid
    //    get bolt11 from req.body
    //    send bolt11 via websocket to user_id
    // else if status = paid
    //    create withdraw lnurl
};
exports.handleIncomingWithdrawLNURL = (req, res, next) => {
    // get user_id from req.query
    // get lnurl from req.body
    // send lnurl via websocket to user_id
};
