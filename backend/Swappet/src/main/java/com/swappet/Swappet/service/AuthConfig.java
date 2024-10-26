package com.swappet.Swappet.service;

import com.swappet.Swappet.model.User;
import com.swappet.Swappet.repository.UserRepository;
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
//spremanje u bazu i veza sa frontendom - treba otkriti kako

@Configuration
public class AuthConfig extends DefaultOAuth2UserService {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .authorizeHttpRequests(registry->{
                    registry.requestMatchers("/", "/register").permitAll();
                    registry.anyRequest().authenticated();
                })
                .oauth2Login(oauth2login->{
                    oauth2login
                            .loginPage("/login")
                            .successHandler(new AuthenticationSuccessHandler() {
                        @Override
                        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                            response.sendRedirect("/profile");
                        }
                    });;
                })
                .formLogin(Customizer.withDefaults())
                .build();
    }

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        int id = oAuth2User.getAttribute("id");
        String username = oAuth2User.getAttribute("username");
        String email = oAuth2User.getAttribute("email");

        // Save or update user details in the database
        User user = new User(id, username, email);
        userRepository.save(user);

        return oAuth2User;
    }
}
