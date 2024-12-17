package Swappet.service;

import Swappet.model.JeUkljucen;
import Swappet.model.Transakcija;
import Swappet.model.Ulaznica;
import Swappet.repository.JeUkljucenRepository;
import Swappet.repository.TransakcijaRepository;
import Swappet.repository.UlaznicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UlaznicaService {

    @Autowired
    private UlaznicaRepository ulaznicaRepository;

    @Autowired
    private TransakcijaRepository transakcijaRepository;

    @Autowired
    private JeUkljucenRepository jeUkljucenRepository;

    // Fetch all Ulaznice
    public List<Ulaznica> getAllUlaznice() {
        return ulaznicaRepository.findAll();
    }

    // Fetch a single Ulaznica by ID
    public Ulaznica getUlaznicaById(Integer id) {
        Optional<Ulaznica> ulaznica = ulaznicaRepository.findById(id);
        return ulaznica.orElse(null);
    }

    // Kupnja ulaznica
    public void purchaseTickets(String buyerEmail, List<Integer> ticketIds) {
        for (Integer idUlaznica : ticketIds) {
            // Dohvati ulaznicu
            Ulaznica ulaznica = ulaznicaRepository.findById(idUlaznica)
                    .orElseThrow(() -> new IllegalArgumentException("Ulaznica nije pronađena: " + idUlaznica));

            // Stvori i spremi uspješnu transakciju
            Transakcija transakcija = new Transakcija(1, ulaznica, LocalDateTime.now());
            transakcijaRepository.save(transakcija);

            // Dodaj u JeUkljucen sa automatskim prihvaćanjem
            JeUkljucen jeUkljucen = new JeUkljucen(buyerEmail, 1);
            jeUkljucenRepository.save(jeUkljucen);
        }
    }
}
