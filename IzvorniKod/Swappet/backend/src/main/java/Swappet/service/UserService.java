package Swappet.service;

import Swappet.model.JeUkljucen;
import Swappet.model.Korisnik;
import Swappet.model.Transakcija;
import Swappet.repository.JeUkljucenRepository;
import Swappet.repository.KorisnikRepository;
import Swappet.repository.TransakcijaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private KorisnikRepository userRepository;

    @Autowired
    private TransakcijaRepository transakcijaRepository;

    @Autowired
    private KorisnikRepository korisnikRepository;

    @Autowired
    private JeUkljucenRepository jeUkljucenRepository;

    //upit u bazu za korisnika na temelju emaila (ključ)
    public Korisnik findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    //upit u bazu za transakcije u kojima je sudjelovao korisnik
    public List<Transakcija> getUserTransactions(String email) {
//        Korisnik korisnik = korisnikRepository.findByEmail(email);
        List<JeUkljucen> ids = jeUkljucenRepository.findByEmail(email);
        List<Transakcija> transakcije = new ArrayList<>();

        for (JeUkljucen jeUkljucen : ids) {
            Integer id = jeUkljucen.getIdTransakcija();
            Transakcija transakcija = transakcijaRepository.findByIdTransakcija(id);
            transakcije.add(transakcija);
        }

        return transakcije;
    }
}