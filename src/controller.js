const paypal = require('@paypal/checkout-server-sdk');
const payPalClient = require('./paypal');

exports.setTransaction = async (req, res) => {
    const {value} = req.body;
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: value
          }
        }]
      });

    let order;
    try {
        order = await payPalClient.client().execute(request);
    } catch (e) {
        console.log(e);
        return res.status(500).json({error:e});
    }

    res.status(200).json({
        order: order.result
    });
}

exports.setAuth = async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    const {value} = req.body;

    request.requestBody({
        intent: 'AUTHORIZE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: value
          }
        }]
      });
    
      let order;
      try {
        order = await payPalClient.client().execute(request);
      } catch (err) {
    
        console.log(e);
        return res.status(500).json({error:e});
      }
    
      res.status(200).json({
        order: order.result
      });
}

exports.captureTransaction = async (req, res) => {
    const {orderID} = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);

    request.requestBody({});

    try {
        const capture = await payPalClient.client().execute(request);

        const captureID = capture.result;
    } catch (e) {
        console.log(e);
        return res.status(500).json({error:e});
    }

    res.status(200).json({
        captureID
    });
}

exports.createAuth = async (req, res) => {
    const {orderID} = req.body;
    const request = new paypal.orders.OrdersAuthorizeRequest(orderID);
    request.requestBody({});

    try {
        const auth = await payPalClient.client().execute(request);
        const authId = auth.result;

    } catch (e) {
        console.log(e);
        return res.status(500).json({error:e});
    }

    res.status(200).json({authId});
}