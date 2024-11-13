package Swappet.model;

import java.io.Serializable;
import java.util.Objects;

public class JeUkljucenId implements Serializable {

    private String email;
    private Integer idTransakcija;

    // Konstruktori

    public JeUkljucenId(String email) {
        this.email = email;
    }

    public JeUkljucenId() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getIdTransakcija() {
        return idTransakcija;
    }

    public void setIdTransakcija(Integer idTransakcija) {
        this.idTransakcija = idTransakcija;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JeUkljucenId that = (JeUkljucenId) o;
        return Objects.equals(email, that.email) && Objects.equals(idTransakcija, that.idTransakcija);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, idTransakcija);
    }
}
