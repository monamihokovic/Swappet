package Swappet.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(scanBasePackages = "Swappet")
@RestController
@EnableJpaRepositories("Swappet.repository")
@EntityScan("Swappet.model")
public class SwappetApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwappetApplication.class, args);
	}

}