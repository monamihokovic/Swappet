package Swappet.model;

import java.io.Serializable;
import java.util.Objects;

public class VoliTipId implements Serializable {

    private String email;
    private Integer idDog;

    public VoliTipId(Integer idDog, String email) {
        this.idDog = idDog;
        this.email = email;
    }

    public VoliTipId() {
    }

    //getteri i setteri

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getIdDog() {
        return idDog;
    }

    public void setIdDog(Integer idDog) {
        this.idDog = idDog;
    }

    // hashCode i equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VoliTipId voliTipId = (VoliTipId) o;
        return Objects.equals(email, voliTipId.email) && Objects.equals(idDog, voliTipId.idDog);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, idDog);
    }
}
