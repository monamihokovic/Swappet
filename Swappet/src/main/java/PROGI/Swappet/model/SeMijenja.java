package PROGI.Swappet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "semijenja")
@IdClass(SeMijenjaId.class)
public class SeMijenja {

    @Id
    @Column(name = "idulaznica", nullable = false)
    private Integer idUlaznica;

    @Id
    @Column(name = "idtransakcija", nullable = false)
    private Integer idTransakcija;

    // konstruktori
    public SeMijenja() {
    }

    public SeMijenja(Integer idUlaznica, Integer idTransakcija) {
        this.idUlaznica = idUlaznica;
        this.idTransakcija = idTransakcija;
    }

    // getter i setteri
    public Integer getIdTransakcija() {
        return idTransakcija;
    }

    public void setIdTransakcija(Integer idTransakcija) {
        this.idTransakcija = idTransakcija;
    }

    public Integer getIdUlaznica() {
        return idUlaznica;
    }

    public void setIdUlaznica(Integer idUlaznica) {
        this.idUlaznica = idUlaznica;
    }
}