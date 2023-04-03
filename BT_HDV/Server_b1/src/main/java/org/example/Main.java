package org.example;
import services.PaymentService;

import javax.xml.ws.Endpoint;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");

        Endpoint.publish("http://localhost:5000/mywebservice", new PaymentService());

    }
}