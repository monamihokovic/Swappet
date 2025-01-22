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
    public Spor createSpor(String tuzioEmail, String tuzeniEmail) {
        Korisnik guilty = korisnikRepository.findByEmail(tuzeniEmail);
        Korisnik blamer = korisnikRepository.findByEmail(tuzioEmail);

        Spor postojeciSpor = sporRepository.findByTuzen(guilty);
        if (postojeciSpor == null) {
            Spor spor = new Spor(
                    "User was naughty",
                    LocalDateTime.now(),
                    0,
                    null,
                    blamer,
                    guilty
            );
            return sporRepository.save(spor);
        } else {
            postojeciSpor.setDvSpor(LocalDateTime.now());
            return sporRepository.save(postojeciSpor);
        }
    }
}