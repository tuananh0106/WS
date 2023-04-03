package dao;

import models.Payment;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class PaymentDAO extends DAO {

    public PaymentDAO() {
        super();
        checkTable();
    }

    private void checkTable() {
        String sql = "CREATE TABLE IF NOT EXISTS payment (id INT NOT NULL AUTO_INCREMENT, cardHolderName VARCHAR(255), cardType VARCHAR(255), cardNumber VARCHAR(255), cvcCode VARCHAR(255), expirationDate VARCHAR(255), txId VARCHAR(255), amount INT, PRIMARY KEY (id))";
        try {
            PreparedStatement ps = con.prepareStatement(sql);
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public ArrayList<Payment> findAll() {
        String sql = "SELECT * FROM payment";
        ArrayList<Payment> payments = new ArrayList<>();
        try {
            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Payment payment = new Payment();
                payment.setCardHolderName(rs.getString("cardHolderName"));
                payment.setCardType(rs.getString("cardType"));
                payment.setCardNumber(rs.getString("cardNumber"));
                payment.setCvcCode(rs.getString("cvcCode"));
                payment.setExpirationDate(rs.getString("expirationDate"));
                payment.setTxId(rs.getString("txId"));
                payment.setAmount(rs.getInt("amount"));
                payments.add(payment);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return payments;
    }

    public boolean create(Payment payment) {
        String sql = "INSERT INTO payment (cardHolderName, cardType, cardNumber, cvcCode, expirationDate, txId, amount) VALUES (?,?,?,?,?,?, ?)";
        try {
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, payment.getCardHolderName());
            ps.setString(2, payment.getCardType());
            ps.setString(3, payment.getCardNumber());
            ps.setString(4, payment.getCvcCode());
            ps.setString(5, payment.getExpirationDate());
            ps.setString(6, payment.getTxId());
            ps.setInt(7, payment.getAmount());
            ps.executeUpdate();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }
}
