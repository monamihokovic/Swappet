package Swappet.service;

import Swappet.model.*;
import Swappet.repository.*;
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

    @Autowired
    private SeMijenjaRepository seMijenjaRepository;

    @Autowired
    private OglasRepository oglasRepository;

    // Fetch all Ulaznice
    public List<Ulaznica> getAllUlaznice() {
        return ulaznicaRepository.findAll();
    }

    // Fetch a single Ulaznica by ID
    public Ulaznica getUlaznicaById(Integer id) {
        Optional<Ulaznica> ulaznica = ulaznicaRepository.findById(id);
        return ulaznica.orElse(null);
    }

    // Kupnja ulaznice
    public void purchaseTickets(String buyerEmail, List<Integer> ticketIds) {
        for (Integer idUlaznica : ticketIds) {
            // Dohvati ulaznicu
            Ulaznica ulaznica = ulaznicaRepository.findById(idUlaznica)
                    .orElseThrow(() -> new IllegalArgumentException("Ulaznica nije pronađena: " + idUlaznica));

            // Stvori i spremi uspješnu transakciju
            Transakcija transakcija = new Transakcija();
            transakcija.setUlaznica(ulaznica);
            transakcija.setUspjesna(1); // označi kao uspješno
            transakcija.setDvPocetak(LocalDateTime.now());
            transakcijaRepository.save(transakcija);

            // Stvori JeUkljucen s idTransakcija
            JeUkljucen jeUkljucen = new JeUkljucen();
            jeUkljucen.setEmail(buyerEmail); // Set the email correctly
            jeUkljucen.setIdTransakcija(transakcija.getIdTransakcija()); // Set the transakcija ID
            jeUkljucen.setOdluka(2); // Assuming this means "accepted" or another status

            // Spremi u bazu
            jeUkljucenRepository.save(jeUkljucen);
        }
    }

    //razmjena ulaznice
//    public void tradeConfirmation(List<Integer> sellerTickets, int decision) {
//        for (Integer idUlaznica : sellerTickets) {
//            Integer idTransakcija = seMijenjaRepository.findByIdUlaznica(idUlaznica).getIdTransakcija();
//            JeUkljucen jeUkljucen = jeUkljucenRepository.findByIdTransakcija(idTransakcija);
//            jeUkljucen.setOdluka(decision);
//            jeUkljucenRepository.save(jeUkljucen);
//        }
//    }

    // Razmjena ulaznica
    public void tradeConfirmation(List<Integer> sellerTicketIds, List<Integer> buyerTicketIds, int decision) {
        // Provjera je li broj ulaznica jednak
        if (sellerTicketIds.size() != buyerTicketIds.size()) {
            throw new IllegalArgumentException("Zamjena ulaznica mora uključivati jednak broj ulaznica.");
        }

        for (Integer sellerTicketId : sellerTicketIds) {
            Ulaznica sellerTicket = ulaznicaRepository.findById(sellerTicketId)
                    .orElseThrow(() -> new IllegalArgumentException("Prodavatelj ulaznice nije pronađen: " + sellerTicketId));

            Oglas sellerOglas = sellerTicket.getOglas();

            // Provjera je li prodavateljev oglas označen za zamjenu
            if (sellerOglas.getTipOglas() != 2) {
                throw new IllegalArgumentException("Ulaznica nije označena za zamjenu.");
            }

            Integer transactionId = seMijenjaRepository.findByIdUlaznica(sellerTicketId).getIdTransakcija();

            JeUkljucen jeUkljucen = jeUkljucenRepository.findByIdTransakcija(transactionId);
            jeUkljucen.setOdluka(decision);
            jeUkljucenRepository.save(jeUkljucen);
        }
    }

    public void submitExchangeAd(Integer idUlaznica, String opisZamjene) {
        Ulaznica ulaznica = ulaznicaRepository.findById(idUlaznica)
                .orElseThrow(() -> new IllegalArgumentException("Ulaznica nije pronađena: " + idUlaznica));

        Oglas oglas = ulaznica.getOglas();

        // Provjera da ulaznica nije označena za prodaju
        if (oglas.getTipOglas() == 1) { // 1 = za prodaju
            throw new IllegalStateException("Ulaznica ne može biti označena za prodaju i razmjenu u isto vrijeme.");
        }

        // Ažuriranje polja Oglasa za razmjenu
        oglas.setTipOglas(2); // Označimo da je oglas za zamjenu
        oglas.setOpisZamjene(opisZamjene); // Ažuriramo opis razmjene

        oglasRepository.save(oglas);
    }

}
