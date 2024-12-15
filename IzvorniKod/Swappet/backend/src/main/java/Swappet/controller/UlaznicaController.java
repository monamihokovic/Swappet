package Swappet.controller;

import Swappet.model.Ulaznica;
import Swappet.service.UlaznicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ulaznica")
public class UlaznicaController {

    @Autowired
    private UlaznicaService ulaznicaService;

    // Fetch all Ulaznica records
    @GetMapping("/all")
    public ResponseEntity<List<Ulaznica>> getAllUlaznice() {
        List<Ulaznica> ulaznice = ulaznicaService.getAllUlaznice();
        return ResponseEntity.ok(ulaznice);
    }

    // Fetch a specific Ulaznica by ID
    @GetMapping("/{id}")
    public ResponseEntity<Ulaznica> getUlaznicaById(@PathVariable Integer id) {
        Ulaznica ulaznica = ulaznicaService.getUlaznicaById(id);
        return ulaznica != null ? ResponseEntity.ok(ulaznica) : ResponseEntity.notFound().build();
    }
}
