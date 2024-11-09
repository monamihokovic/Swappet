package Swappet.service;

import Swappet.model.Korisnik;
import Swappet.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class AuthConfig extends DefaultOAuth2UserService {


    //Funkcija za autentifikaciju korisnika preko Google OAuth2
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(auth -> auth
                        //na ove rute može doći i neregistrirani korisnik
                        .requestMatchers("/", "/register", "/homepage/").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2login -> oauth2login
                        .successHandler((request, response, authentication) -> {
                            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

                            //izvadi username i pošalji ga na frontend
                            String username = oAuth2User.getAttribute("name");
                            if(username == null){
                                username = "gost";
                            }

                            String redirectUrl = "http://localhost:3000/selection?username=" + username + "&username=" + username;

                            //redirect na frontend
                            response.sendRedirect(redirectUrl);
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
        if(userRepository.findByEmail(email) == null) {
            Korisnik user = new Korisnik(id, email, username);
            System.out.println(user.getUsername());
            System.out.println(user.getIdKorisnik());
            System.out.println(user.getEmail());
            userRepository.save(user);
        }

        return oAuth2User;
    }
}