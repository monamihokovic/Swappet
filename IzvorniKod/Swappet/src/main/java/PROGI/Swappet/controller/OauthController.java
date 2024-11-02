package PROGI.Swappet.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class OauthController {

    @RequestMapping("/")
    public String home(){
        return "Welcome to Funland, Sonic";
    }

    @RequestMapping("/user")
    public Principal user(Principal user){
        return user;
    }
}
