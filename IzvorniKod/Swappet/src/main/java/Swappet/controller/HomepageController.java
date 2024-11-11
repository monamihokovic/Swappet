package Swappet.controller;

import Swappet.service.OglasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/homepage")
public class HomepageController {

    // Homepage: trebaš primiti od frontenda kategorije za oglase,
    // ubaciti upit u bazu i vratiti na frontend oglase iz tih kategorija

    @Autowired
    private OglasService oglasService;

    private List<OglasDTO> storedOglasiData;

    // nova verzija, oglasi po kategoriji uz cijenu ulaznice
    @PostMapping("/oglas")
    public ResponseEntity<Void> getOglasWithCijenaByCategories(@RequestBody List<Integer> categories) {
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
}