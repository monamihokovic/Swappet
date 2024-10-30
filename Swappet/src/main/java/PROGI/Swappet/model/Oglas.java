package PROGI.Swappet.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "oglas")
public class Oglas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idoglas", nullable = false)
    private Integer idOglas;

    @Column(name = "datum", nullable = false)
    private LocalDateTime datum;

    @Column(name = "ulica", length = 50, nullable = false)
    private String ulica;

    @Column(name = "grad", length = 50, nullable = false)
    private String grad;

    @Column(name = "kucnibr", length = 50, nullable = false)
    private String kucnibr;

    @Column(name = "opis", length = 1000, nullable = false)
    private String opis;

    @Column(name = "aktivan", nullable = false)
    private Integer aktivan;

    @Column(name = "tipoglas", nullable = false)
    private Integer tipOglas;

    @Column(name = "opiszamjene", length = 1000, nullable = true)
    private String opisZamjene;

    @ManyToOne
    @JoinColumn(name = "email", nullable = false)
    private Korisnik korisnik;

    // Getteri i setteri
    //...
}