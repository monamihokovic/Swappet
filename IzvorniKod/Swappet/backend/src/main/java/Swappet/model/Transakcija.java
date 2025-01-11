package Swappet.model;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "transakcija")
public class Transakcija {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtransakcija", nullable = false)
    private Integer idTransakcija;

    @Column(name = "uspjesna", nullable = false)
    private Integer uspjesna;

    @Column(name = "dvpocetak", nullable = false)
    private LocalDateTime dvPocetak;

    @ManyToOne
    @JoinColumn(name = "idulaznica", nullable = false)
    private Ulaznica ulaznica;

    // novo dodadno
    @ManyToOne(optional = true)
    @JoinColumn(name = "idnadtransakcija", referencedColumnName = "idnadtransakcija")
    private Nadtransakcija nadtransakcija;
    // kraj novo

    /*
    stari
    public Transakcija(Integer uspjesna, Ulaznica ulaznica, LocalDateTime dvPocetak) {
        this.uspjesna = uspjesna;
        this.ulaznica = ulaznica;
        this.dvPocetak = dvPocetak;
    }
     */

    // Konstruktor s parametrima novi
    public Transakcija(Integer uspjesna, Ulaznica ulaznica, LocalDateTime dvPocetak, Nadtransakcija nadtransakcija) {
        this.uspjesna = uspjesna;
        this.ulaznica = ulaznica;
        this.dvPocetak = dvPocetak;
        this.nadtransakcija = nadtransakcija;
    }
    // kraj novo

    public Transakcija() {
    }

    public Integer getUspjesna() {
        return uspjesna;
    }

    public void setUspjesna(Integer uspjesna) {
        this.uspjesna = uspjesna;
    }

    public LocalDateTime getDvPocetak() {
        return dvPocetak;
    }

    public void setDvPocetak(LocalDateTime dvPocetak) {
        this.dvPocetak = dvPocetak;
    }

    public Ulaznica getUlaznica() {
        return ulaznica;
    }

    public void setUlaznica(Ulaznica ulaznica) {
        this.ulaznica = ulaznica;
    }

    public Integer getIdTransakcija() {
        return idTransakcija;
    }

    // novo
    public Nadtransakcija getNadtransakcija() {
        return nadtransakcija;
    }

    public void setNadtransakcija(Nadtransakcija nadtransakcija) {
        this.nadtransakcija = nadtransakcija;
    }
    // kraj novo

}