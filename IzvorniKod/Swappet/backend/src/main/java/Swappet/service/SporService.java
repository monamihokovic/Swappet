package Swappet.service;

import org.springframework.stereotype.Service;
import Swappet.model.Korisnik;
import Swappet.model.Spor;
import Swappet.repository.KorisnikRepository;
import Swappet.repository.SporRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;


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

    // updateaj odluku spora
    public Spor updateSporDecision(Integer idSpor, Integer odlukaSpor, String obrazlozenje) {
        Spor spor = sporRepository.findById(idSpor)
                .orElseThrow(() -> new IllegalArgumentException("Nije pronađen spor s id-ijem: " + idSpor));

        spor.setOdlukaSpor(odlukaSpor);
        spor.setObrazlozenje(obrazlozenje);
        return sporRepository.save(spor);
    }

    // dohvati sve sporove
    public List<Spor> getAllSporovi() {
        return sporRepository.findAll();
    }
}
