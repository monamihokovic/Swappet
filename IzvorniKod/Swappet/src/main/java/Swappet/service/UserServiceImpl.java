package Swappet.service;

import Swappet.model.Korisnik;
import Swappet.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements KorisnikService{

    @Autowired
    private KorisnikRepository userRepository;

    //funkcija za debuggiranje, vraća sve korisnike
    @Override
    public List<Korisnik> getAllUsers() {
        return userRepository.findAll();
    }

    //upit u bazu za korisnika na temeljju emaila (ključ)
    public Korisnik findUserByUsername(String email) {
        return userRepository.findByEmail(email);
    }
}
