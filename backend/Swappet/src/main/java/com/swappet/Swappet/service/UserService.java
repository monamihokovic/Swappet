package com.swappet.Swappet.service;

import com.swappet.Swappet.model.User;

import java.util.List;

public interface UserService {

    public User saveUser(User user);
    public List<User> getAllUsers(); //funkcija za testiranje, neće nam trebati poslije

}
