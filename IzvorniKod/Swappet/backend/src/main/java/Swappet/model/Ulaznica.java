package Swappet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ulaznica")
public class Ulaznica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idulaznica", nullable = false)
    private Integer idUlaznica;

    @Column(name = "red", nullable = true)
    private Integer red;

    @Column(name = "broj", nullable = true)
    private Integer broj;

    @Column(name = "vrstaulaznice", nullable = true)
    private Integer vrstaUlaznice;

    @Column(name = "cijena", nullable = true)
    private Double cijena;

    @ManyToOne
    @JoinColumn(name = "idoglas", nullable = false)
    private Oglas oglas;

    // konstruktor

    public Ulaznica(Integer red, Integer vrstaUlaznice, Integer broj, Double cijena, Oglas oglas) {
        this.red = red;
        this.vrstaUlaznice = vrstaUlaznice;
        this.broj = broj;
        this.cijena = cijena;
        this.oglas = oglas;
    }

    public Ulaznica() {
    }

    // getter i setter


    public Integer getRed() {
        return red;
    }

    public void setRed(Integer red) {
        this.red = red;
    }

    public Integer getBroj() {
        return broj;
    }

    public void setBroj(Integer broj) {
        this.broj = broj;
    }

    public Integer getVrstaUlaznice() {
        return vrstaUlaznice;
    }

    public void setVrstaUlaznice(Integer vrstaUlaznice) {
        this.vrstaUlaznice = vrstaUlaznice;
    }

    public Double getCijena() {
        return cijena;
    }

    public void setCijena(Double cijena) {
        this.cijena = cijena;
    }

    public Oglas getOglas() {
        return oglas;
    }

    public void setOglas(Oglas oglas) {
        this.oglas = oglas;
    }

    public Integer getIdUlaznica() {
        return idUlaznica;
    }
}