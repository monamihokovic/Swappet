package Swappet.controller;

import Swappet.model.Oglas;
import Swappet.model.TipDog;
import Swappet.model.Ulaznica;

import java.util.List;

public class OglasRequest {

    //komponente zahtjeva
    private Oglas oglas;
    private TipDog tipDog;
    private List<Ulaznica> ulaznice;

    //getteri i setteri
    public Oglas getOglas() {
        return oglas;
    }

    public void setOglas(Oglas oglas) {
        this.oglas = oglas;
    }

    public TipDog getTipDog() {
        return tipDog;
    }

    public void setTipDog(TipDog tipDog) {
        this.tipDog = tipDog;
    }

    public List<Ulaznica> getUlaznice() {
        return ulaznice;
    }

    public void setUlaznice(List<Ulaznica> ulaznice) {
        this.ulaznice = ulaznice;
    }
}
