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

    @GetMapping("/getAll")
    public List<Korisnik> getAllUsers() {
        //vraća listu svih korisnika iz baze, za debugging
        return userService.getAllUsers();
    }

}