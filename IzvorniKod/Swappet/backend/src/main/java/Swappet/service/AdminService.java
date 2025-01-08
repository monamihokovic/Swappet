package Swappet.service;

import Swappet.controller.OglasDTO;
import Swappet.model.Oglas;
import Swappet.model.Transakcija;
import Swappet.repository.OglasRepository;
import Swappet.repository.TransakcijaRepository;
import Swappet.repository.UlaznicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private OglasRepository oglasRepository;

    @Autowired
    private TransakcijaRepository transakcijaRepository;

    @Autowired
    private UlaznicaRepository ulaznicaRepository;

    public List<OglasDTO> getAllOglasi() {
        List<Object[]> rawData = oglasRepository.findAllOglasi();
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

    public List<Transakcija> getAllTransactions() {
        return transakcijaRepository.findAll();
    }
}