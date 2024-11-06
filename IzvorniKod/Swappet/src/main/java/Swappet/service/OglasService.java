package Swappet.service;

import Swappet.model.Oglas;
import Swappet.repository.OglasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OglasService {

    @Autowired
    private OglasRepository oglasRepository;

    public Oglas saveOglas(Oglas oglas) {
        return oglasRepository.save(oglas);
    }
}
