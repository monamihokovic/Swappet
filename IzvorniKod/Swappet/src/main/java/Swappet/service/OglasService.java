package Swappet.service;

import Swappet.model.Oglas;
import Swappet.repository.OglasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OglasService {

    @Autowired
    private OglasRepository oglasRepository;

    //upit za oglase u bazu, na temelju kategorije
    public List<Oglas> getOglasByCategories(List<Integer> categories) {
        return oglasRepository.findOglasByTipOglasIn(categories);
    }

    //spremanje oglasa u bazu
    public Oglas saveOglas(Oglas oglas) {
        return oglasRepository.save(oglas);
    }

}
