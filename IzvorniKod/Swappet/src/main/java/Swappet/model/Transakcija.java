package Swappet.model;

import jakarta.persistence.*;

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

    public Transakcija(Integer uspjesna, Ulaznica ulaznica, LocalDateTime dvPocetak) {
        this.uspjesna = uspjesna;
        this.ulaznica = ulaznica;
        this.dvPocetak = dvPocetak;
    }

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
}
