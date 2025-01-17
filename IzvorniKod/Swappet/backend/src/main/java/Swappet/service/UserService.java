package Swappet.service;

import Swappet.model.JeUkljucen;
import Swappet.model.Korisnik;
import Swappet.model.Transakcija;
import Swappet.model.Oglas;
import Swappet.repository.*;
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
    private JeUkljucenRepository jeUkljucenRepository;

    @Autowired
    private UlaznicaRepository ulaznicaRepository;

    @Autowired
    private OglasRepository oglasRepository;

    //upit u bazu za korisnika na temelju emaila (ključ)
    public Korisnik findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    //upit u bazu za transakcije u kojima je sudjelovao korisnik
    public List<Transakcija> getUserTransactions(String email) {
        List<JeUkljucen> ids = jeUkljucenRepository.findByEmail(email);
        List<Transakcija> transakcije = new ArrayList<>();

        for (JeUkljucen jeUkljucen : ids) {
            Integer id = jeUkljucen.getIdTransakcija();
            Transakcija transakcija = transakcijaRepository.findByIdTransakcija(id);
            transakcije.add(transakcija);
        }

        return transakcije;
    }

    //aktivacija/deaktivacija korisnikovih oglasa
    public void oglasActivation(Integer idOglas, Integer activation) {
        Oglas oglas = oglasRepository.findByIdOglas(idOglas);
        oglas.setAktivan(activation);
        oglasRepository.save(oglas);
    }
}