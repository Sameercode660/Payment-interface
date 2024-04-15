import express from "express";
import cors from "cors";
import qrcode from "qrcode";

const app = express();

app.use(cors());
app.use(express.json());

app.post(
  "/testing",
  (req, res, next) => {
    const { id } = req.body;

    if (id == 123) {
      req.admin = {
        isAdmin: true,
      };
    } else {
      req.admin = {
        isAdmin: false,
      };
    }
    next();
  },
  (req, res) => {
    const { isAdmin } = req.admin;

    if (isAdmin) {
      return res.status(200).json({ message: "Admin previleges are granted" });
    }
    res.status(200).json({ message: "Normal user is authorized" });
  }
);

app.post('/qr-code', async (req, res) => {
    const upiData = {
        VPA: '6394867435@ybl', // Replace with your UPI ID
        amount: req.body.amount, // Fixed amount
        currency: 'INR', // Currency code
        // Additional fields like merchant details, transaction reference, etc., can be added here
    };

    const upiString = `upi://pay?pa=${upiData.VPA}&am=${upiData.amount}&cu=${upiData.currency}`;
    
    try {
        const qrCodeImage = await qrcode.toDataURL(upiString);
        res.send({ qrCodeImage });
    } catch (error) {
        console.error('Error generating UPI QR code:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(8080, () => {
  console.log("Server is listening on port ", 8080);
});
