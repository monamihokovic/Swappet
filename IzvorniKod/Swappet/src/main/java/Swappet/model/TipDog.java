package Swappet.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipdog")
public class TipDog {

    @Id
    @Column(name = "iddog", nullable = false)
    private Integer idDog;

    @Column(name = "nazivtipa", length = 100, nullable = false)
    private String nazivtipa;

    public TipDog(Integer idDog, String nazivtipa) {
        this.idDog = idDog;
        this.nazivtipa = nazivtipa;
    }

    public TipDog() {
    }

    public Integer getIdDog() {
        return idDog;
    }

    public void setIdDog(Integer idDog) {
        this.idDog = idDog;
    }

    public String getNazivtipa() {
        return nazivtipa;
    }

    public void setNazivtipa(String nazivtipa) {
        this.nazivtipa = nazivtipa;
    }

}
