package Swappet.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "Swappet")
public class SwappetApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwappetApplication.class, args);
	}

}
