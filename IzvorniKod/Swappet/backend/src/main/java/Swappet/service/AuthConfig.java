package Swappet.service;

import Swappet.model.Korisnik;
import Swappet.model.Spor;
import Swappet.repository.KorisnikRepository;
import Swappet.repository.SporRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

@Configuration
public class AuthConfig extends DefaultOAuth2UserService {

    // dohvati env varijablu
    @Value("${frontend.url:http://localhost:3000}") // default na localhost ako nije konfigurirano
    private String frontendUrl;

    //Funkcija za autentifikaciju korisnika preko Google OAuth2
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors().and()
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/register", "/homepage", "/homepage/oglas",
                                "/ulaznica/kupnja", "/ulaznica", "/ulaznica/podnesi-razmjenu", "/user",
                                "/user/oglasi", "/ulaznica/razmjene",
                                "/homepage/advertisements", "/ulaznica/all", "/createEvent",
                                "/admin/**", "/user/transactions",
                                "/user/oglasi/{email}", "/myTransactions", "/oglas/add", "/user/trades/**",
                                "/advertisements", "/admin/activation", "user/activation").permitAll()
                        .anyRequest().authenticated()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // Ruta za odjavu
                        .logoutSuccessHandler((request, response, authentication) -> {
                            // Dodatne akcije nakon odjave, npr. preusmjeravanje
                            response.setStatus(HttpServletResponse.SC_OK);
                            response.sendRedirect(frontendUrl);
                        })
                        .deleteCookies("JSESSIONID") // Brisanje kolačića sesije
                        .invalidateHttpSession(true) // Invalidacija sesije
                )
                .oauth2Login(oauth2login -> oauth2login
                        .successHandler((request, response, authentication) -> {
                            // dodaj cors header
                            //response.setHeader("Access-Control-Allow-Origin", frontendUrl);
                            //response.setHeader("Access-Control-Allow-Origin", "https://xaviers-mern-blog.onrender.com");
                            response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE");
                            //redirect na frontend
                            response.sendRedirect(frontendUrl + "/selection");
                        })
                )
                .build();
    }

    @Autowired
    private KorisnikRepository userRepository;

    //funkcija koja provjerava postoji li korisnik u bazi te ga sprema ako nije
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        //iz OAuth2 vadimo username, email i id korisnika
        String username = oAuth2User.getAttribute("name");
        String email = oAuth2User.getAttribute("email");
        String idlong = oAuth2User.getAttribute("sub");
        //potrebno je Googleov id srezati jer je prevelik za int
        int id = Integer.parseInt(idlong.substring(idlong.length() - 7));

        //provjera i spremanje korisnika u bazu
        if (userRepository.findByEmail(email) == null) {
            Korisnik user = new Korisnik(email, id, username);
            userRepository.save(user);
        } else {
            // provjera je li korisnik bio blokiran
            Korisnik korisnik = userRepository.findByEmail(email);

            if (korisnik.getKoristi() == 0) {
                throw new OAuth2AuthenticationException("Korisnik je blokiran.");
            }
        }

        return oAuth2User;
    }
}