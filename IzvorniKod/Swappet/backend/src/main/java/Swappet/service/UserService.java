package Swappet.service;

import Swappet.model.Korisnik;
import Swappet.model.Oglas;
import Swappet.model.Transakcija;
import Swappet.repository.KorisnikRepository;
import Swappet.repository.OglasRepository;
import Swappet.repository.TransakcijaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private KorisnikRepository userRepository;

    @Autowired
    private TransakcijaRepository transakcijaRepository;

    @Autowired
    private OglasRepository oglasRepository;

    //upit u bazu za korisnika na temelju emaila (ključ)
    public Korisnik findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    //upit u bazu za transakcije u kojima je sudjelovao korisnik
    /*public List<Transakcija> getUserTransactions(String email) {
        return transakcijaRepository.findByEmail(email);
    }*/

    //upit u bazu za oglase koje je korisnik predao
    /*public List<Oglas> getUserOglas(String email) {
        return oglasRepository.findOglasByEmail(email);
    }*/
}
