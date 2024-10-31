package PROGI.Swappet.model;

import java.io.Serializable;
import java.util.Objects;

public class SeMijenjaId implements Serializable {

    private Integer idUlaznica;
    private Integer idTransakcija;

    public SeMijenjaId(Integer idUlaznica, Integer idTransakcija) {
        this.idUlaznica = idUlaznica;
        this.idTransakcija = idTransakcija;
    }

    public SeMijenjaId() {
    }

    // getteri i setteri
    public Integer getIdUlaznica() {
        return idUlaznica;
    }

    public void setIdUlaznica(Integer idUlaznica) {
        this.idUlaznica = idUlaznica;
    }

    public Integer getIdTransakcija() {
        return idTransakcija;
    }

    public void setIdTransakcija(Integer idTransakcija) {
        this.idTransakcija = idTransakcija;
    }

    // hash i equal
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SeMijenjaId that = (SeMijenjaId) o;
        return Objects.equals(idUlaznica, that.idUlaznica) && Objects.equals(idTransakcija, that.idTransakcija);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUlaznica, idTransakcija);
    }
}
