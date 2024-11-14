package Swappet.controller;

import Swappet.model.Korisnik;
import Swappet.model.Oglas;
import Swappet.model.TipDog;
import Swappet.model.Ulaznica;
import Swappet.service.KorisnikServiceImpl;
import Swappet.service.OglasService;
import Swappet.repository.TipDogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/oglas")
public class OglasController {

    @Autowired
    private TipDogRepository tipDogRepository;

    @Autowired
    private OglasService oglasService;

    @Autowired
    private KorisnikServiceImpl korisnikServiceImpl;

    //dodavanje oglasa u bazu
    @PostMapping("")
    public Oglas addOglas(@RequestBody OglasRequest oglasRequest, @AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            throw new RuntimeException("User not authenticated");
        }

        // izvadimo korisničke podatke iz principal objekta
        String email = principal.getAttribute("email");

        // Provjera ako email iz principal-a nije prisutan
        if (email == null || email.isEmpty()) {
            throw new RuntimeException("Email is missing from user principal");
        }

        // Proveravamo da li korisnik postoji u bazi
        Korisnik korisnik = korisnikServiceImpl.findUserByEmail(email);
        if (korisnik == null) {
            throw new RuntimeException("User not found for email: " + email);
        }

        // izvuci podatke iz requesta
        String description = oglasRequest.getDescription();
        Integer categoryId = oglasRequest.getCategoryId();
        Double price = oglasRequest.getPrice();
        String street = oglasRequest.getStreet();
        String houseNumber = oglasRequest.getHouseNumber();
        String city = oglasRequest.getCity();
        String date = oglasRequest.getDate();

        // parsiraj datum
        LocalDateTime eventDate;
        try {
            eventDate = LocalDateTime.parse(date);
        } catch (Exception e) {
            throw new RuntimeException("Invalid date format", e);
        }

        // napravi objekt Oglas sa svim potrebnim podatcima
        Oglas oglas = new Oglas();
        oglas.setDatum(eventDate);
        oglas.setUlica(street);
        oglas.setGrad(city);
        oglas.setKucnibr(houseNumber);
        oglas.setOpis(description);
        oglas.setTipOglas(categoryId);
        oglas.setAktivan(1);
        oglas.setOpisZamjene("");
        oglas.setKorisnik(korisnik);

        // Napraviti objekat Ulaznica
        Ulaznica ulaznica = new Ulaznica();
        ulaznica.setCijena(price);
        ulaznica.setVrstaUlaznice(null);
        ulaznica.setRed(null);
        ulaznica.setBroj(null);
        ulaznica.setOglas(oglas);

        List<Ulaznica> ulaznice = new ArrayList<>();
        ulaznice.add(ulaznica);

        // Spremiti TipDog
        TipDog tipDog = tipDogRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("TipDog not found for id " + categoryId));

        // Spremiti Oglas i Ulaznicu u bazu
        return oglasService.saveOglasWithDetails(oglas, tipDog, ulaznice);
    }
}