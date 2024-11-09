package Swappet.service;

import Swappet.model.JeTip;
import Swappet.model.Oglas;
import Swappet.model.TipDog;
import Swappet.model.Ulaznica;
import Swappet.repository.JeTipRepository;
import Swappet.repository.OglasRepository;
import Swappet.repository.TipDogRepository;
import Swappet.repository.UlaznicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OglasService {

    @Autowired
    private OglasRepository oglasRepository;

    @Autowired
    private TipDogRepository tipDogRepository;

    @Autowired
    private JeTipRepository jeTipRepository;

    @Autowired
    private UlaznicaRepository ulaznicaRepository;


    // stara verzija
    // public List<Oglas> getOglasByCategories(List<Integer> categories) {
    //     return oglasRepository.findOglasByTipOglasIn(categories);
    // }

    //upit za oglase u bazu, na temelju kategorije (vraćamo s cijenom ulaznice), izmjenjena verzija
    public List<Map<String, Object>> getOglasWithCijenaByCategories(List<Integer> categories) {
        List<Object[]> results = oglasRepository.findOglasWithCijenaByCategories(categories);
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] result : results) {
            Oglas oglas = (Oglas) result[0];
            Float cijena = (Float) result[1];

            Map<String, Object> oglasData= new HashMap<>();
            oglasData.put("idoglas", oglas.getIdOglas());
            oglasData.put("datum", oglas.getDatum());
            oglasData.put("ulica", oglas.getUlica());
            oglasData.put("grad", oglas.getGrad());
            oglasData.put("opis", oglas.getOpis());
            oglasData.put("aktivan", oglas.getTipOglas());
            oglasData.put("opisZamjene", oglas.getOpisZamjene());
            oglasData.put("cijena", cijena);

            response.add(oglasData);
        }
        return response;
    }

    //spremanje oglasa u bazu
    public Oglas saveOglas(Oglas oglas) {
        return oglasRepository.save(oglas);
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


}
