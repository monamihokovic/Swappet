package Swappet.service;

import Swappet.model.Korisnik;
import Swappet.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KorisnikServiceImpl implements KorisnikService{

    @Autowired
    private KorisnikRepository userRepository;

    //upit u bazu za korisnika na temelju emaila (ključ)
    public Korisnik findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
