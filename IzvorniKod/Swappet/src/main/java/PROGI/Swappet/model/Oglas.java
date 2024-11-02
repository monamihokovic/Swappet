package PROGI.Swappet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "oglas")
public class Oglas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idoglas", nullable = false)
    private Integer idOglas;

    @Column(name = "datum", nullable = false)
    private LocalDateTime datum;

    @Column(name = "ulica", length = 50, nullable = false)
    private String ulica;

    @Column(name = "grad", length = 50, nullable = false)
    private String grad;

    @Column(name = "kucnibr", length = 50, nullable = false)
    private String kucnibr;

    @Column(name = "opis", length = 1000, nullable = false)
    private String opis;

    @Column(name = "aktivan", nullable = false)
    private Integer aktivan;

    @Column(name = "tipoglas", nullable = false)
    private Integer tipOglas;

    @Column(name = "opiszamjene", length = 1000, nullable = true)
    private String opisZamjene;

    @ManyToOne
    @JoinColumn(name = "email", nullable = false)
    private Korisnik korisnik;

    // konstruktor

    public Oglas(LocalDateTime datum, String ulica, String grad, String kucnibr, String opis, Integer aktivan, Integer tipOglas, String opisZamjene, Korisnik korisnik) {
        this.datum = datum;
        this.ulica = ulica;
        this.grad = grad;
        this.kucnibr = kucnibr;
        this.opis = opis;
        this.aktivan = aktivan;
        this.tipOglas = tipOglas;
        this.opisZamjene = opisZamjene;
        this.korisnik = korisnik;
    }

    public Oglas() {
    }

    // getteri i setteri

    public Integer getIdOglas() {
        return idOglas;
    }

    public Korisnik getKorisnik() {
        return korisnik;
    }

    public void setKorisnik(Korisnik korisnik) {
        this.korisnik = korisnik;
    }

    public String getOpisZamjene() {
        return opisZamjene;
    }

    public void setOpisZamjene(String opisZamjene) {
        this.opisZamjene = opisZamjene;
    }

    public Integer getTipOglas() {
        return tipOglas;
    }

    public void setTipOglas(Integer tipOglas) {
        this.tipOglas = tipOglas;
    }

    public Integer getAktivan() {
        return aktivan;
    }

    public void setAktivan(Integer aktivan) {
        this.aktivan = aktivan;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getGrad() {
        return grad;
    }

    public void setGrad(String grad) {
        this.grad = grad;
    }

    public String getUlica() {
        return ulica;
    }

    public void setUlica(String ulica) {
        this.ulica = ulica;
    }

    public String getKucnibr() {
        return kucnibr;
    }

    public void setKucnibr(String kucnibr) {
        this.kucnibr = kucnibr;
    }

    public LocalDateTime getDatum() {
        return datum;
    }

    public void setDatum(LocalDateTime datum) {
        this.datum = datum;
    }
}