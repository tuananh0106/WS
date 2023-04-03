package dao;

import java.sql.Connection;
import java.sql.DriverManager;

public class DAO {
    public static Connection con;

    public DAO(){
        if(con == null){
//            String dbUrl = "jdbc:mysql://localhost:3306/soc_soap?autoReconnect=true&useSSL=false";
            String dbUrl = "jdbc:mysql://localhost:3306/payment001";
            String dbClass = "com.mysql.jdbc.Driver";

            try {
                Class.forName(dbClass);
                con = DriverManager.getConnection (dbUrl, "root", "123456");
            }catch(Exception e) {
                e.printStackTrace();
            }
        }
    }
}
