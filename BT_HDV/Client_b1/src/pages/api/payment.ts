// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// @ts-ignore
import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import axios from "axios";
import { xml2json } from "xml-js";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const body = req.body;
  // res.status(200).json({ name: "John Doe" });
  // post method
  const paymentInfo = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:processPayment>
         <cardHolderName>${body.cardHolderName}</cardHolderName>
         <cardType>${body.cardType}</cardType>
         <cardNumber>${body.cardNumber}</cardNumber>
         <cvc>${body.cvc}</cvc>
         <expirationDate>${body.expirationDate}</expirationDate>
         <amount>${body.amount}</amount>
         <txId>${body.txId}</txId>
      </ser:processPayment>
   </soapenv:Body>
</soapenv:Envelope>`;

  const paymentResponse = await axios.post(
    // "http://localhost:5000/mywebservice",
    "http://127.0.0.1:5000/mywebservice",
    paymentInfo,
    {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
    }
  );
  console.log(paymentResponse.data);
  res.status(200).json(
    JSON.parse(
      xml2json(paymentResponse.data, {
        compact: true,
        spaces: 4,
      })
    )
  );
}
