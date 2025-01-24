package Swappet.controller;

import Swappet.model.Spor;
import Swappet.service.OglasService;
import Swappet.service.SporService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/oglas/{email}")
    public ResponseEntity<Void> getOglasWithCijenaByCategories(@RequestBody List<Integer> categories, @PathVariable String email) {

        if (!email.equals("undefined")) {
            storedOglasiData = oglasService.getOglasWithCijenaByCategories(categories, email);
        } else {
            storedOglasiData = oglasService.getOglasWithCijenaByCategories(categories, null);
        }
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

    // kreiraj novi spor, prijavi korisnika
    @PostMapping("/dispute")
    public ResponseEntity<Spor> createSpor(@RequestParam String tuzioEmail, @RequestParam String tuzeniEmail) {
        System.out.println("Tuzenik: " + tuzeniEmail);
        Spor spor = sporService.createSpor(tuzioEmail, tuzeniEmail);
        return ResponseEntity.ok(spor);
    }
}