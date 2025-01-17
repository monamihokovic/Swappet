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
    @Autowired
    private KorisnikRepository korisnikRepository;


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
    public void tradeConfirmation(Integer idOglasSeller, Integer idOglasBuyer, Integer amount, int decision) {
        List<Ulaznica> sellerTickets = ulaznicaRepository.findUlazniceByOglas(idOglasSeller);
        Oglas sellerOglas = oglasRepository.findByIdOglas(idOglasSeller);

        // Provjera je li prodavateljev oglas označen za zamjenu
        if (sellerOglas.getTipOglas() == 1) {
            throw new IllegalArgumentException("Ulaznica nije označena za zamjenu.");
        }

        for (int i = 0; i < amount; i++) {
            Ulaznica sellerTicket = sellerTickets.get(i);
            Integer transactionId = seMijenjaRepository.findByIdUlaznica(sellerTicket.getIdUlaznica()).getIdTransakcija();

            JeUkljucen jeUkljucen = jeUkljucenRepository.findByIdTransakcija(transactionId);
            jeUkljucen.setOdluka(decision);
            jeUkljucenRepository.save(jeUkljucen);
        }
    }

    public void submitExchangeAd(Integer idOglasSeller, Integer idOglasBuyer, Integer amount) {
        List<Ulaznica> ulazniceSeller = ulaznicaRepository.findUlazniceByOglas(idOglasSeller);
        List<Ulaznica> ulazniceBuyer = ulaznicaRepository.findUlazniceByOglas(idOglasBuyer);
        Oglas oglasBuyer = oglasRepository.findByIdOglas(idOglasBuyer);
        //System.out.println(amount);

        for (int i = 0; i < amount; i++) {
            Ulaznica ulaznica = ulazniceSeller.get(i);

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
            Ulaznica buyer = ulazniceBuyer.get(i);
            seMijenja.setIdUlaznica(buyer.getIdUlaznica());
            seMijenja.setIdTransakcija(idTransakcija);
            seMijenjaRepository.save(seMijenja);

        }

        // dohvati podatke o prodavacu
        Oglas oglasSeller = ulazniceSeller.get(0).getOglas();
        String sellerEmail = oglasSeller.getKorisnik().getEmail();
        String sellerOpis = oglasSeller.getOpis();

        // dohvati podatke o kupcu (inicijatoru razmjene)
        String buyerEmail = oglasBuyer.getKorisnik().getEmail();
        String buyerOpis = oglasBuyer.getOpis();

        // dohvati broj ulaznica za razmjenu
        Integer numberOfTickets = amount;

        // obavijesti prodavaca da mu je poslan zahtjev za razmjenu
        emailService.notifyExchangeRequest(buyerEmail, sellerEmail, buyerOpis, sellerOpis, numberOfTickets);

    }

    public List<Oglas> getExchangeAds(String mail) {
        Korisnik korisnik = korisnikRepository.findByEmail(mail);
        List<Oglas> exchangeAds = oglasRepository.findTradesForUser(korisnik);
        return exchangeAds;
    }

}