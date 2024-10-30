package PROGI.Swappet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "semijenja")
@IdClass(SeMijenjaId.class)
public class SeMijenja {

    @Id
    @Column(name = "idulaznica", nullable = false)
    private Integer idUlaznica;

    @Id
    @Column(name = "idtransakcija", nullable = false)
    private Integer idTransakcija;

    // Getteri i setteri
    //...
}