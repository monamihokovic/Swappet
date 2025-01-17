package Swappet.service;

import Swappet.controller.OglasDTO;
import Swappet.controller.TradeDTO;
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

    @Autowired
    private VoliOglasRepository voliOglasRepository;

    @Autowired
    TransakcijaRepository transakcijaRepository;

    //upit za oglase u bazu, na temelju kategorije (vraćamo s cijenom ulaznice), izmjenjena verzija
    public List<OglasDTO> getOglasWithCijenaByCategories(List<Integer> categories) {
        System.out.println("[SERVICE] Fetching advertisements for categories: " + categories);

        List<Object[]> rawData = oglasRepository.findOglasWithCijenaByCategories(categories);
        List<OglasDTO> result = new ArrayList<>();

        for (Object[] row : rawData) {
            Oglas oglas = (Oglas) row[0];
            Double price = (Double) row[1];

            String email = oglas.getKorisnik().getEmail();
            Integer likedStatus = voliOglasRepository.findByEmailAndIdOglas(email, oglas.getIdOglas())
                    .map(VoliOglas::getVoli)
                    .orElse(0);

            OglasDTO dto = buildOglasDTO(oglas, price, likedStatus);

            result.add(dto);
        }

        System.out.println("[SERVICE] All advertisements processed: " + result);
        return result;
    }

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

            // dohvati like, dislike, report status za trenutnog korisnika
            Integer likedStatus = voliOglasRepository.findByEmailAndIdOglas(email, oglas.getIdOglas())
                    .map(VoliOglas::getVoli)
                    .orElse(0);

//            // isključimo dislajkane ili reportane oglase
//            if (likedStatus == -1 || likedStatus == 2) {
//                continue;
//            }

            OglasDTO dto = buildOglasDTO(oglas, price, likedStatus);
            result.add(dto);
        }

        return result;
    }

    public List<TradeDTO> getUserTrades(String email) {
        List<Object[]> rawData = transakcijaRepository.findUserTrades(email);
        List<TradeDTO> result = new ArrayList<>();

        int di = -1;
        int counter = 0;

        for (Object[] row : rawData) {
            Integer idOglasSeller = (Integer) row[3];
            if (idOglasSeller == di) {
                counter++;
                continue;
            }

            di = idOglasSeller;

            Integer odluka = (Integer) row[0];
            Integer idSeller = (Integer) row[1];
            Integer idBuyer = (Integer) row[2];

            Oglas oglasSeller = oglasRepository.findByIdOglas(idOglasSeller);
            String sellerDesc = oglasSeller.getOpis();
            String sellerTradeDesc = oglasSeller.getOpisZamjene();

            Oglas oglasBuyer = ulaznicaRepository.findById(idBuyer).get().getOglas();
            Integer buyerId = oglasBuyer.getIdOglas();
            String buyerDesc = oglasBuyer.getOpis();

            TradeDTO tradeDTO = new TradeDTO(
                    idSeller,
                    sellerDesc,
                    sellerTradeDesc,
                    buyerId,
                    buyerDesc,
                    counter
            );

            result.add(tradeDTO);

        }

        return result;
    }

    public void saveUserInteraction(String email, Integer idOglas, Integer action) {
        VoliOglas voliOglas = new VoliOglas(email, action, idOglas);
        voliOglasRepository.save(voliOglas);
    }

    // pomoć za konstrukciju OglasDTO
    private OglasDTO buildOglasDTO(Oglas oglas, Double price, Integer likedStatus) {
        String address = oglas.getUlica() + " " + oglas.getKucnibr() + ", " + oglas.getGrad();
        String date = oglas.getDatum().toString();
        Integer numberOfTickets = oglas.getAktivan();
        Integer ticketType = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).getFirst().getVrstaUlaznice();
        Integer red = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).getFirst().getRed();
        Integer broj = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).getFirst().getBroj();
        String tradeDescription = oglas.getOpisZamjene();
        Integer eventType = jeTipRepository.findByIdOglas(oglas.getIdOglas()).getIdDog();

        return new OglasDTO(
                oglas.getIdOglas(),
                oglas.getOpis(),
                oglas.getTipOglas().toString(),
                price,
                address,
                date,
                numberOfTickets,
                ticketType,
                broj,
                red,
                eventType,
                oglas.getKorisnik().getEmail(),
                tradeDescription,
                likedStatus
        );
    }

}