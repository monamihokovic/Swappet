package Swappet.controller;

import Swappet.model.Korisnik;
import Swappet.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/") //rute treba prilagoditi
public class UserController {

    @Autowired
    private KorisnikService userService;

    @PostMapping("/register")
    public String add(@RequestBody Korisnik user) {
        userService.saveUser(user);
        return "New user added";
    }

    @GetMapping("/getAll")
    public List<Korisnik> getAllUsers() {
        //daj mi iz baze i pošalji na frontend
        return userService.getAllUsers();
    }

}