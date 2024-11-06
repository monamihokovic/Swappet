package Swappet.service;

import Swappet.model.Korisnik;
import Swappet.repository.KorisnikRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

//SVE rute treba podesiti na ono što će zapravo biti

@Configuration
public class AuthConfig extends DefaultOAuth2UserService {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/register", "/homepage/").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2login -> oauth2login
                        //.loginPage("/login")
                        .successHandler((request, response, authentication) -> {
                            response.sendRedirect("/homepage");
                        })
                )
                .build();
    }

    @Autowired
    private KorisnikRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String username = oAuth2User.getAttribute("username");
        String email = oAuth2User.getAttribute("email");

        int id;
        if(oAuth2User.getAttribute("id") == null || username == null){
            id = 2213;
            username = "Takumi Rodjowara";
        }else{
            id = oAuth2User.getAttribute("id");
        }

        if(userRepository.findByEmail(email) == null) {
            // Save or update user details in the database
            Korisnik user = new Korisnik(id, email, username);
            System.out.println(user.getUsername());
            System.out.println(user.getIdKorisnik());
            System.out.println(user.getEmail());
            userRepository.save(user);
        }

        return oAuth2User;
    }
}
