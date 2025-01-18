package Swappet.service;

import org.springframework.stereotype.Service;
import Swappet.model.Korisnik;
import Swappet.model.Spor;
import Swappet.repository.KorisnikRepository;
import Swappet.repository.SporRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;


@Service
public class SporService {
    @Autowired
    private SporRepository sporRepository;

    @Autowired
    private KorisnikRepository korisnikRepository;

    // stvaranje novog spora
    public Spor createSpor(String opisSpor, String tuzioEmail, String tuzeniEmail) {
        Korisnik tuzio = korisnikRepository.findByEmail(tuzioEmail);
        Korisnik tuzen = korisnikRepository.findByEmail(tuzeniEmail);

        Spor spor = new Spor(opisSpor, LocalDateTime.now(), tuzio, tuzen);
        return sporRepository.save(spor);
    }

}
