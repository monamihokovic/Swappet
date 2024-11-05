package Swappet.model;

import java.io.Serializable;
import java.util.Objects;

public class JeTipId implements Serializable {

    private Integer idDog;
    private Integer idOglas;

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

    // Konstruktor
    public JeTipId() {
    }

    public JeTipId(Integer idDog, Integer idOglas) {
        this.idDog = idDog;
        this.idOglas = idOglas;
    }


    // equals i hashCode metode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JeTipId that = (JeTipId) o;
        return Objects.equals(idDog, that.idDog) &&
                Objects.equals(idOglas, that.idOglas);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idDog, idOglas);
    }
}
