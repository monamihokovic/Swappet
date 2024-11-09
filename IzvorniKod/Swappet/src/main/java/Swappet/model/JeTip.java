package Swappet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "jetip")
@IdClass(JeTipId.class)
public class JeTip {

    @Id
    @Column(name = "iddog", nullable = false)
    private Integer idDog;

    @Id
    @Column(name = "idoglas", nullable = false)
    private Integer idOglas;

    // konstruktor
    public JeTip() {
    }

    public JeTip(Integer idDog, Integer idOglas) {
        this.idDog = idDog;
        this.idOglas = idOglas;
    }

    // Getteri i setteri
    public Integer getIdDog() {
        return idDog;
    }

    public void setIdDog(Integer idDog) {
        this.idDog = idDog;
    }

    public Integer getIdOglas() {
        return idOglas;
    }

    public void setIdOglas(Integer idOglas) {
        this.idOglas = idOglas;
    }
}
