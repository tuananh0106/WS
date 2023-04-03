package models;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

//@XmlRootElement
public class Payment implements Serializable {
    private String cardHolderName;
    private String cardType;
    private String cardNumber;
    private String cvcCode;
    private String expirationDate;
    private String txId;

    private Integer amount;

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Payment() {
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCvcCode() {
        return cvcCode;
    }

    public void setCvcCode(String cvcCode) {
        this.cvcCode = cvcCode;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getTxId() {
        return txId;
    }

    public void setTxId(String txId) {
        this.txId = txId;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "cardHolderName='" + cardHolderName + '\'' +
                ", cardType='" + cardType + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                ", cvcCode='" + cvcCode + '\'' +
                ", expirationDate='" + expirationDate + '\'' +
                ", txId='" + txId + '\'' +
                ", amount=" + amount +
                '}';
    }
}
