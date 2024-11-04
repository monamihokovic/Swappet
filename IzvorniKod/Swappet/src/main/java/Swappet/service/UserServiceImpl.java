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

    @Override
    public Korisnik saveUser(Korisnik user) {
        return userRepository.save(user);
    }

    @Override
    public List<Korisnik> getAllUsers() {
        return userRepository.findAll();
    }
}
