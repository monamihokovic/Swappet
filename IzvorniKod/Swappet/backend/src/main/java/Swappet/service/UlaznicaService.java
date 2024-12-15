package Swappet.service;

import Swappet.model.Ulaznica;
import Swappet.repository.UlaznicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UlaznicaService {

    @Autowired
    private UlaznicaRepository ulaznicaRepository;

    // Fetch all Ulaznice
    public List<Ulaznica> getAllUlaznice() {
        return ulaznicaRepository.findAll();
    }

    // Fetch a single Ulaznica by ID
    public Ulaznica getUlaznicaById(Integer id) {
        Optional<Ulaznica> ulaznica = ulaznicaRepository.findById(id);
        return ulaznica.orElse(null);
    }
}
