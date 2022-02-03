const opennode = require("opennode");
const { emitEvent } = require("../websockets/emitters");

opennode.setCredentials(process.env.OPENNODE_API_KEY_WITHDRAW, "dev");

exports.createPaymentRequest = (req, res, next) => {
    // get user_id, amount, description from req.query
    console.log("0");
    const { user_id } = req.params;
    const amount = req.body.satsAmount;
    // create callback_url = <host>/api/v1/opennode/pay&user_id=user_id
    const callback_url = `${req.protocol}s://${req.hostname}/api/v1/opennode/pay/${user_id}`;
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
            return res.status(200).json({ status: "success", charge });
        })
        .catch((error) => {
            console.error(`${error.status} | ${error.message}`);
        });
    console.log("2");
};

exports.payInvoice = (req, res, next) => {
    const { bolt11 } = req.body;
    const { user_id } = req.params;
    const withdrawal = {
        type: "ln",
        address: bolt11,
        //amount: 120, - Required if the invoice has no amount set (amount = 0)
        callback_url: `${req.protocol}://${req.hostname}/api/v1/opennode/pay/${user_id}`,
    };
    opennode
        .initiateWithdrawalAsync(withdrawal)
        .then((withdrawal) => {
            console.log(withdrawal);
            return res.status(200).json({ status: "success" });
        })
        .catch((error) => {
            console.error(`${error.status} | ${error.message}`);
        });
};

exports.handleIncomingInvoice = (req, res, next) => {
    // get user_id from req.query
    const { user_id } = req.params;
    const { status } = req.body;
    // get invoice status from req.body
    switch (status) {
        case "unpaid":
            //    get bolt11 from req.body
            //    send bolt11 via websocket to user_id
            break;
        case "paid":
            const { price, description, order_id } = req.body;
            const price_int = parseInt(price, 10);
            const withdrawal = {
                min_amt: price_int,
                max_amt: price_int,
                description,
                external_id: order_id,
                callback_url: "https://example.com/webhook/opennode",
            };
            opennode
                .createLnUrlWithdrawal(withdrawal)
                .then((response) => {
                    console.log(response);
                    // send lnurl to frontend via ws
                    const body = {
                        eventName: "withdraw lnurl",
                        userId: user_id,
                        data: {
                            uri: response.uri,
                        },
                    };
                    emitEvent(body);
                })
                .catch((error) => {
                    console.error(`${error.status} | ${error.message}`);
                });
            break;

        default:
            break;
    }
    // if status === unpaid
    //    get bolt11 from req.body
    //    send bolt11 via websocket to user_id
    // else if status = paid
    //    create withdraw lnurl
    console.log(req.body);
    return res.status(200).json({ status: "success" });
};
exports.handleWithdrawLNURLState = (req, res, next) => {
    // get user_id from req.query
    // get lnurl id ? update it's state in db <unpaid|paid>
    console.log("handleWithdrawLNURLState");
    console.log(req.body);
    res.status(204);
};
