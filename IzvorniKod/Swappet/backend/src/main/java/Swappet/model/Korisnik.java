package Swappet.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "korisnik")
public class Korisnik {

    @Id
    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "idkorisnik", unique = true, nullable = false)
    private Integer idKorisnik;

    @Column(name = "username", unique = true, nullable = false, length = 100)
    private String username;

    @Column(name = "uloga", nullable = false)
    private Integer uloga = 0;

    @Column(name = "koristi", nullable = false)
    private Integer koristi = 1;

    public Korisnik(String email, Integer idKorisnik, String username, Integer uloga, Integer koristi) {
        this.email = email;
        this.idKorisnik = idKorisnik;
        this.username = username;
        this.uloga = uloga;
        this.koristi = koristi;
    }

    public Korisnik(String email, Integer idKorisnik, String username) {
        this.email = email;
        this.idKorisnik = idKorisnik;
        this.username = username;
    }

    public Korisnik() {

    }

    public Integer getUloga() {
        return uloga;
    }

    public void setUloga(Integer uloga) {
        this.uloga = uloga;
    }

    public Integer getKoristi() {
        return koristi;
    }

    public void setKoristi(Integer koristi) {
        this.koristi = koristi;
    }

    // Getteri i setteri
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getIdKorisnik() {
        return idKorisnik;
    }

    public void setIdKorisnik(Integer idKorisnik) {
        this.idKorisnik = idKorisnik;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
