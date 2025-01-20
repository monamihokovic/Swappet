package Swappet.model;

import java.io.Serializable;
import java.time.LocalDate;

public class DeaktiviranOglasId implements Serializable {

    private Integer idoglas;
    private LocalDate dvdeaktivacije;

    public DeaktiviranOglasId(Integer idoglas, LocalDate dvdeaktivacije) {
        this.idoglas = idoglas;
        this.dvdeaktivacije = dvdeaktivacije;
    }

    public DeaktiviranOglasId() {
    }

    public Integer getIdoglas() {
        return idoglas;
    }

    public void setIdoglas(Integer idoglas) {
        this.idoglas = idoglas;
    }

    public LocalDate getDvdeaktivacije() {
        return dvdeaktivacije;
    }

    public void setDvdeaktivacije(LocalDate dvdeaktivacije) {
        this.dvdeaktivacije = dvdeaktivacije;
    }
}
