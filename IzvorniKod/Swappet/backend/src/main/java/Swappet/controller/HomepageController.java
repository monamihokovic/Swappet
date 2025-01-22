package Swappet.controller;

import Swappet.model.Korisnik;
import Swappet.model.Spor;
import Swappet.repository.KorisnikRepository;
import Swappet.repository.SporRepository;
import Swappet.service.OglasService;
import Swappet.service.SporService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/homepage")
public class HomepageController {

    @Autowired
    private OglasService oglasService;

    private List<OglasDTO> storedOglasiData;

    @Autowired
    private SporService sporService;

    // nova verzija, oglasi po kategoriji uz cijenu ulaznice
    @PostMapping("/oglas")
    public ResponseEntity<Void> getOglasWithCijenaByCategories(@RequestBody List<Integer> categories) {
        //System.out.println(categories.toString());
        List<OglasDTO> oglasi = oglasService.getOglasWithCijenaByCategories(categories);
        storedOglasiData = oglasi;
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    //ovom rutom vraćamo oglase na frontend
    @GetMapping("/advertisements")
    public ResponseEntity<List<OglasDTO>> getStoredOglasiData() {
        if (storedOglasiData != null) {
            return ResponseEntity.ok(storedOglasiData); // Return the stored data
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // If no data found
        }
    }

    // kreiraj novi spor
    @PostMapping("/dispute")
    public ResponseEntity<Spor> createSpor(@RequestParam String tuzioEmail, @RequestParam String tuzeniEmail) {
        Spor spor = sporService.createSpor(tuzioEmail, tuzeniEmail);
        return ResponseEntity.ok(spor);
    }
}