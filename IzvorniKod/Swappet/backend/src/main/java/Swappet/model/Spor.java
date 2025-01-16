package Swappet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import Swappet.model.Korisnik;


@Entity
@Table(name = "spor")
public class Spor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idspor", nullable = false)
    private Integer idSpor;

    @Column(name = "opisspor", nullable = false, length = 1000)
    private String opisSpor;

    @Column(name = "dvspor", nullable = false)
    private LocalDateTime dvSpor;

    @Column(name = "odlukaspor", nullable = false)
    private Integer odlukaSpor = 0;

    @Column(name = "obrazlozenje", length = 1000)
    private String obrazlozenje;

    @ManyToOne
    @JoinColumn(name = "tuzioemail", nullable = false, referencedColumnName = "email")
    private Korisnik tuzio;

    @ManyToOne
    @JoinColumn(name = "tuzenemail", nullable = false, referencedColumnName = "email")
    private Korisnik tuzen;


    public Spor() {
    }

    public Spor(String opisSpor, LocalDateTime dvSpor, Integer odlukaSpor, String obrazlozenje, Korisnik tuzio, Korisnik tuzen) {
        this.opisSpor = opisSpor;
        this.dvSpor = dvSpor;
        this.odlukaSpor = odlukaSpor;
        this.obrazlozenje = obrazlozenje;
        this.tuzio = tuzio;
        this.tuzen = tuzen;
    }

    public Spor(String opisSpor, LocalDateTime dvSpor, Korisnik tuzio, Korisnik tuzen) {
        this.opisSpor = opisSpor;
        this.dvSpor = dvSpor;
        this.tuzio = tuzio;
        this.tuzen = tuzen;
    }

    public Integer getIdSpor() {
        return idSpor;
    }

    public void setIdSpor(Integer idSpor) {
        this.idSpor = idSpor;
    }

    public String getOpisSpor() {
        return opisSpor;
    }

    public void setOpisSpor(String opisSpor) {
        this.opisSpor = opisSpor;
    }

    public LocalDateTime getDvSpor() {
        return dvSpor;
    }

    public void setDvSpor(LocalDateTime dvSpor) {
        this.dvSpor = dvSpor;
    }

    public String getObrazlozenje() {
        return obrazlozenje;
    }

    public void setObrazlozenje(String obrazlozenje) {
        this.obrazlozenje = obrazlozenje;
    }

    public Integer getOdlukaSpor() {
        return odlukaSpor;
    }

    public void setOdlukaSpor(Integer odlukaSpor) {
        this.odlukaSpor = odlukaSpor;
    }

    public Korisnik getTuzio() {
        return tuzio;
    }

    public void setTuzio(Korisnik tuzio) {
        this.tuzio = tuzio;
    }

    public Korisnik getTuzen() {
        return tuzen;
    }

    public void setTuzen(Korisnik tuzen) {
        this.tuzen = tuzen;
    }
}
