package PROGI.Swappet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ulaznica")
public class Ulaznica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idulaznica", nullable = false)
    private Integer idUlaznica;

    @Column(name = "red", nullable = false)
    private Integer red;

    @Column(name = "broj", nullable = false)
    private Integer broj;

    @Column(name = "vrstaulaznice")
    private Integer vrstaUlaznice;

    @Column(name = "cijena", nullable = true )
    private Float cijena;

    @ManyToOne
    @JoinColumn(name = "idoglas", nullable = false)
    private Oglas oglas;

    // Getteri i setteri
    //...
}