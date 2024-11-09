package Swappet.controller;

import Swappet.model.Oglas;
import Swappet.model.TipDog;
import Swappet.model.Ulaznica;
import Swappet.service.OglasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/oglas")
public class OglasController {

    @Autowired
    private OglasService oglasService;

    //dodavanje oglasa u bazu
    @PostMapping
    public Oglas addOglas(@RequestBody OglasRequest oglasRequest) {

        //razdvoji zahtjev na komponente
        Oglas oglas = oglasRequest.getOglas();
        TipDog tipDog = oglasRequest.getTipDog();
        List<Ulaznica> ulaznice = oglasRequest.getUlaznice();
        return oglasService.saveOglasWithDetails(oglas, tipDog, ulaznice);
    }
}
