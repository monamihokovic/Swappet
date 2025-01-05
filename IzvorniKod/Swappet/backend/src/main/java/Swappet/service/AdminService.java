/*package Swappet.service;

import Swappet.model.Oglas;
import Swappet.model.Transakcija;
import Swappet.repository.OglasRepository;
import Swappet.repository.TransakcijaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private OglasRepository oglasRepository;

    @Autowired
    private TransakcijaRepository transakcijaRepository;

    public List<Oglas> getAllOglasi() {
        return oglasRepository.findAll();
    }

    public List<Transakcija> getAllTransactions() {
        return transakcijaRepository.findAll();
    }
}*/
