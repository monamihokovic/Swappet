package Swappet.service;

import Swappet.controller.OglasDTO;
import Swappet.model.*;
import Swappet.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OglasService {

    @Autowired
    private KorisnikRepository korisnikRepository;

    @Autowired
    private OglasRepository oglasRepository;

    @Autowired
    private TipDogRepository tipDogRepository;

    @Autowired
    private JeTipRepository jeTipRepository;

    @Autowired
    private UlaznicaRepository ulaznicaRepository;

    //upit za oglase u bazu, na temelju kategorije (vraćamo s cijenom ulaznice), izmjenjena verzija
    public List<OglasDTO> getOglasWithCijenaByCategories(List<Integer> categories) {
        List<Object[]> rawData = oglasRepository.findOglasWithCijenaByCategories(categories);
        List<OglasDTO> result = new ArrayList<>();

        for (Object[] row : rawData) {
            Oglas oglas = (Oglas) row[0];  // Oglas objekt
            Double price = (Double) row[1];  // cijena iz Ulaznice

            //formatiraj adresu
            String address = oglas.getUlica() + ", " + oglas.getGrad();

            //formatiraj datum po potrebu
            String date = oglas.getDatum().toString();

            // dohvati broj ulaznica za taj oglas
//            Integer numberOfTickets = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).size();
            Integer numberOfTickets = oglas.getAktivan();

            // dohvati tip ulaznice
            Integer ticketType = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).getFirst().getVrstaUlaznice();

            // dohvati email prodavača
            String email = oglas.getKorisnik().getEmail();

            //dohvati opis zamjene
            String tradeDescription = oglas.getOpisZamjene();

            //konvertiraj u DTO
            OglasDTO dto = new OglasDTO(
                    oglas.getIdOglas(),
                    oglas.getOpis(),
                    oglas.getTipOglas().toString(),
                    price,
                    address,
                    date,
                    numberOfTickets,
                    ticketType,
                    email,
                    tradeDescription
            );

            result.add(dto);
        }

        return result;
    }

    //spremanje oglasa u bazu
//    public Oglas saveOglas(Oglas oglas) {
//        return oglasRepository.save(oglas);
//    }

    //spremanje ulaznica i tipova dogadaja u bazu
    public Oglas saveOglasWithDetails(Oglas oglas, TipDog tipDog, List<Ulaznica> ulaznice) {
        // spremi sam oglas
        Oglas savedOglas = oglasRepository.save(oglas);

        // spremi tip dogadaja i povezi ga s oglasom pomocu jeTip
        TipDog savedTipDog = tipDogRepository.save(tipDog);
        JeTip jetip = new JeTip(savedTipDog.getIdDog(), savedOglas.getIdOglas());
        jeTipRepository.save(jetip);


        // spremi ulaznice i povezi ih s oglasom
        for (Ulaznica ulaznica : ulaznice) {
            ulaznica.setOglas(savedOglas);
            ulaznicaRepository.save(ulaznica);
        }

        return savedOglas;
    }

    //dohvat svih oglasa jednog korisnika, za user
    public List<OglasDTO> getAllOglasi(String email) {
        Korisnik korisnik = korisnikRepository.findByEmail(email);
        List<Object[]> rawData = oglasRepository.findOglasWithCijenaByEmail(korisnik);
        List<OglasDTO> result = new ArrayList<>();

        for (Object[] row : rawData) {
            Oglas oglas = (Oglas) row[0];  // Oglas objekt
            Double price = (Double) row[1];  // cijena iz Ulaznice

            //formatiraj adresu
            String address = oglas.getUlica() + ", " + oglas.getGrad();

            //formatiraj datum po potrebu
            String date = oglas.getDatum().toString();

            // dohvati broj ulaznica za taj oglas
            Integer numberOfTickets = oglas.getAktivan();

            // dohvati tip ulaznice
            Integer ticketType = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).getFirst().getVrstaUlaznice();

            //dohvati opis zamjene
            String tradeDescription = oglas.getOpisZamjene();

            //konvertiraj u DTO
            OglasDTO dto = new OglasDTO(
                    oglas.getIdOglas(),
                    oglas.getOpis(),
                    oglas.getTipOglas().toString(),
                    price,
                    address,
                    date,
                    numberOfTickets,
                    ticketType,
                    email,
                    tradeDescription
            );

            result.add(dto);
        }

        return result;
    }

    public List<OglasDTO> getUserTrades(String email) {
        Korisnik korisnik = korisnikRepository.findByEmail(email);
        List<OglasDTO> result = new ArrayList<>();
        List<Oglas> trades = oglasRepository.findTradesForUser(korisnik);

        for (Oglas oglas : trades) {
            //formatiraj adresu
            String address = oglas.getUlica() + ", " + oglas.getGrad();

            //formatiraj datum po potrebu
            String date = oglas.getDatum().toString();

            // dohvati broj ulaznica za taj oglas
            Integer numberOfTickets = oglas.getAktivan();

            // dohvati tip ulaznice
            Integer ticketType = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).getFirst().getVrstaUlaznice();

            //dohvati opis zamjene
            String tradeDescription = oglas.getOpisZamjene();

            //cijena je 0 jer se radi o razmjeni
            Double price = 0.0;

            //konvertiraj u DTO
            OglasDTO dto = new OglasDTO(
                    oglas.getIdOglas(),
                    oglas.getOpis(),
                    oglas.getTipOglas().toString(),
                    price,
                    address,
                    date,
                    numberOfTickets,
                    ticketType,
                    email,
                    tradeDescription
            );

            result.add(dto);
        }

        return result;
    }

}