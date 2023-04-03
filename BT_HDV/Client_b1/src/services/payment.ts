const endpoint = "http://localhost:5000/mywebservice";
import axios from "axios";
// Send the SOAP request
// @ts-ignore
// @ts-ignore
export async function processPayment(
  cardHolderName: any,
  cardType: any,
  cardNumber: any,
  cvc: any,
  expirationDate: any,
  amount: any,
  txId: any
) {
  //   const soapBody =
  //     '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.example.com/">' +
  //     "<soapenv:Header/>" +
  //     "<soapenv:Body>" +
  //     "<ser:processPayment>" +
  //     "<ser:cardHolderName>" +
  //     cardHolderName +
  //     "</ser:cardHolderName>" +
  //     "<ser:cardType>" +
  //     cardType +
  //     "</ser:cardType>" +
  //     "<ser:cardNumber>" +
  //     cardNumber +
  //     "</ser:cardNumber>" +
  //     "<ser:cvc>" +
  //     cvc +
  //     "</ser:cvc>" +
  //     "<ser:expirationDate>" +
  //     expirationDate +
  //     "</ser:expirationDate>" +
  //     "<ser:amount>" +
  //     amount +
  //     "</ser:amount>" +
  //     "<ser:txId>" +
  //     txId +
  //     "</ser:txId>" +
  //     "</ser:processPayment>" +
  //     "</soapenv:Body>" +
  //     "</soapenv:Envelope>";
  //   fetch("http://localhost:5000/mywebservice", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/xml",
  //       // fix cors
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">
  //    <soapenv:Header/>
  //    <soapenv:Body>
  //       <ser:processPayment>
  //          <paymentInfo>
  //             <cardHolderName>Nguyen</cardHolderName>
  //          </paymentInfo>
  //       </ser:processPayment>
  //    </soapenv:Body>
  // </soapenv:Envelope>`,
  //   })
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log(data);
  //       alert("Payment processed successfully");
  //     });

  var data =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services/">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ser:processPayment>\n         <paymentInfo>\n            <cardHolderName>Nguyen</cardHolderName>\n         </paymentInfo>\n      </ser:processPayment>\n   </soapenv:Body>\n</soapenv:Envelope>';

  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:5000/mywebservice",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
