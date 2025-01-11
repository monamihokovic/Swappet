package Swappet.model;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "nadtransakcija")
public class Nadtransakcija {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idnadtransakcija", nullable = false)
    private Integer idNadtransakcija;

    @Column(name = "dvnadpocetak", nullable = false)
    private LocalDateTime dvNadpocetak;

    @Column(name = "ukupno", nullable = false)
    private Integer ukupno;

    public Nadtransakcija(Integer idNadtransakcija, LocalDateTime dvNadpocetak, Integer ukupno) {
        this.idNadtransakcija = idNadtransakcija;
        this.dvNadpocetak = dvNadpocetak;
        this.ukupno = ukupno;
    }

    public Nadtransakcija() {
    }

    public Integer getIdNadtransakcija() {
        return idNadtransakcija;
    }

    public LocalDateTime getDvNadpocetak() {
        return dvNadpocetak;
    }

    public Integer getUkupno() {
        return ukupno;
    }

    public void setIdNadtransakcija(Integer idNadtransakcija) {
        this.idNadtransakcija = idNadtransakcija;
    }

    public void setDvNadpocetak(LocalDateTime dvNadpocetak) {
        this.dvNadpocetak = dvNadpocetak;
    }

    public void setUkupno(Integer ukupno) {
        this.ukupno = ukupno;
    }
}