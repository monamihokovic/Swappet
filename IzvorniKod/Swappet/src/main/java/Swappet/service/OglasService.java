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

import java.util.List;

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

    //upit za oglase u bazu, na temelju kategorije
    public List<Oglas> getOglasByCategories(List<Integer> categories) {
        return oglasRepository.findOglasByTipOglasIn(categories);
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
