package Swappet.controller;

<<<<<<< Updated upstream
import org.springframework.web.bind.annotation.GetMapping;
=======
import Swappet.model.Oglas;
import Swappet.service.OglasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
>>>>>>> Stashed changes
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
<<<<<<< Updated upstream
public class HomepageController {

    @RequestMapping("/homepage")
    public String home(){
        return "Shadow, it's me, the DEVIL";
=======
@RequestMapping("/api/homepage")
public class HomepageController {

    // Homepage: trebaš primiti od frontenda kategorije za oglase,
    // ubaciti upit u bazu i vratiti na frontend oglase iz tih kategorija

    @Autowired
    private OglasService oglasService;

    @PostMapping("/oglas")
    public ResponseEntity<List<Oglas>> getOglasByCategories(@RequestBody List<Integer> categories) {
        List<Oglas> oglasi = oglasService.getOglasByCategories(categories);
        return ResponseEntity.ok(oglasi);
>>>>>>> Stashed changes
    }

}
