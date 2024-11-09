package Swappet.model;

import java.io.Serializable;
import java.util.Objects;

public class VoliOglasId implements Serializable {

    private String email;
    private Integer idOglas;

    //komstruktori
    public VoliOglasId(String email, Integer idOglas) {
        this.email = email;
        this.idOglas = idOglas;
    }

    public VoliOglasId() {
    }

    // getteri i stteri
    public Integer getIdOglas() {
        return idOglas;
    }

    public void setIdOglas(Integer idOglas) {
        this.idOglas = idOglas;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // hash


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VoliOglasId that = (VoliOglasId) o;
        return Objects.equals(email, that.email) && Objects.equals(idOglas, that.idOglas);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, idOglas);
    }
}
