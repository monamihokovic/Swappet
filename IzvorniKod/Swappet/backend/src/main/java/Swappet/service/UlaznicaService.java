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

    @Autowired
    private EmailService emailService;

    // dohvati sve ulznice
    public List<Ulaznica> getAllUlaznice() {
        return ulaznicaRepository.findAll();
    }

    // dohvati jednu ulaznicu preko id
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
            jeUkljucen.setEmail(buyerEmail); // postavi email kupca
            jeUkljucen.setIdTransakcija(transakcija.getIdTransakcija()); // postavi id transakcije
            jeUkljucen.setOdluka(2); // postavi odluku na 2 (uspješno)

            // Spremi u bazu
            jeUkljucenRepository.save(jeUkljucen);
        }

        String sellerEmail = ulaznicaRepository.findById(ticketIds.get(0)).get().getOglas().getKorisnik().getEmail();
        String opis = ulaznicaRepository.findById(ticketIds.get(0)).get().getOglas().getOpis();
        Integer numberOfTickets = ticketIds.size();

        // obavijesti prodavaca da je ulaznica prodana
        emailService.notifyTicketSold(sellerEmail, opis, numberOfTickets);
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

    public void submitExchangeAd(Integer idOglasBuyer, Integer idOglasSeller) {
        List<Ulaznica> ulazniceSeller = ulaznicaRepository.findUlazniceByOglas(idOglasSeller);
        List<Ulaznica> ulazniceBuyer = ulaznicaRepository.findUlazniceByOglas(idOglasBuyer);
        Oglas oglasBuyer = oglasRepository.findByIdOglasId(idOglasBuyer);
        int index = 0;

        for (Ulaznica ulaznica : ulazniceSeller) {
            Transakcija transakcija = new Transakcija();
            transakcija.setUlaznica(ulaznica);
            transakcija.setDvPocetak(LocalDateTime.now());
            transakcija.setUspjesna(0);
            transakcijaRepository.save(transakcija);

            Integer idTransakcija = transakcijaRepository.findByUlaznica(ulaznica).getIdTransakcija();
            JeUkljucen jeUkljucen = new JeUkljucen();
            jeUkljucen.setEmail(oglasBuyer.getKorisnik().getEmail());
            jeUkljucen.setOdluka(2);
            jeUkljucen.setIdTransakcija(idTransakcija);
            jeUkljucenRepository.save(jeUkljucen);

            SeMijenja seMijenja = new SeMijenja();
            Ulaznica buyer = ulazniceBuyer.get(index);
            seMijenja.setIdUlaznica(buyer.getIdUlaznica());
            seMijenja.setIdTransakcija(idTransakcija);
            seMijenjaRepository.save(seMijenja);

            index++;
        }

    }

    public List<Oglas> getExchangeAds(Integer idOglasSeller) {
        Oglas oglas = oglasRepository.findByIdOglasId(idOglasSeller);
        Integer brojUlaznica = oglas.getAktivan();
        String opisZamjene = oglas.getOpisZamjene();

        List<Oglas> exchangeAds = oglasRepository.findExchangeAds(brojUlaznica, opisZamjene);
        return exchangeAds;
    }

}