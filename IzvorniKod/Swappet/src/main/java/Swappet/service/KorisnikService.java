package Swappet.service;

import Swappet.model.Korisnik;
import java.util.List;

public interface KorisnikService {

    public Korisnik saveUser(Korisnik user);
    public List<Korisnik> getAllUsers(); //funkcija za testiranje, neće nam trebati poslije

}