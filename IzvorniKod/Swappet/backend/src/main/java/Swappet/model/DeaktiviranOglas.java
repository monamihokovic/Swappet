package Swappet.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "deaktiviranoglas")
@IdClass(DeaktiviranOglasId.class)
public class DeaktiviranOglas {

    @Id
    @Column(name = "idoglas")
    private Integer idoglas;

    @Column(name = "dvdeaktivacije")
    private LocalDate dvdeaktivacije;

    public DeaktiviranOglas(Integer idoglas, LocalDate dvdeaktivacije) {
        this.idoglas = idoglas;
        this.dvdeaktivacije = dvdeaktivacije;
    }

    public DeaktiviranOglas() {
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
