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

    public List<Oglas> getOglasByCategories(List<Integer> categories) {
        return oglasRepository.findOglasByTipOglasIn(categories);
    }
}
