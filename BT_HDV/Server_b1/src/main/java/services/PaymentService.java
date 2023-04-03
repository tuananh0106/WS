package services;
import dao.PaymentDAO;

import models.Payment;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

@WebService
@SOAPBinding(style = Style.RPC)
public class PaymentService {

    private static final PaymentDAO paymentDAO = new PaymentDAO();

    @WebMethod
    public String processPayment(@WebParam(name = "cardHolderName") String cardHolderName,
                                 @WebParam(name = "cardType") String cardType,
                                 @WebParam(name = "cardNumber") String cardNumber,
                                 @WebParam(name = "cvc") String cvc,
                                 @WebParam(name = "expirationDate") String expirationDate,
                                 @WebParam(name = "amount") Integer amount,
                                 @WebParam(name = "txId") String txId
                                 ) {

            Payment payment = new Payment();
            payment.setCardHolderName(cardHolderName);
            payment.setCardType(cardType);
            payment.setCardNumber(cardNumber);
            payment.setCvcCode(cvc);
            payment.setExpirationDate(expirationDate);
            payment.setTxId(txId);
            payment.setAmount(amount);
            System.out.println(payment);

            Boolean paymentStatus = paymentDAO.create(payment);
            if(!paymentStatus){
                return "Failed";
            }
            return "Successful";
    }

    @WebMethod
    public  Payment[] getAllPayment() {
        ArrayList<Payment> payments  = paymentDAO.findAll();
        // log
        payments.forEach(payment -> {
            System.out.println(payment);
        });
        // payments to arrays
        Payment[] paymentsArray = new Payment[payments.size()];

        return payments.toArray(paymentsArray);

    }
}
