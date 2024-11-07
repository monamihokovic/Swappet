package Swappet.controller;

import Swappet.model.Oglas;
import Swappet.service.OglasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oglas")
public class OglasController {

    @Autowired
    private OglasService oglasService;

    //dodavanje oglasa u bazu
    @PostMapping
    public Oglas addOglas(@RequestBody Oglas oglas) {
        return oglasService.saveOglas(oglas);
    }
}
