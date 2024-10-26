package com.swappet.Swappet.controller;

import com.swappet.Swappet.model.User;
import com.swappet.Swappet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/") //rute treba prilagoditi
//dodati rutu /login -> kako i kamo da spremim podatke o trenutnom korisniku?
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register") //rute treba prilagoditi
    public String add(@RequestBody User user) {
        userService.saveUser(user);
        return "New user added";
    }

    @GetMapping("/getAll") //rute opet
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}