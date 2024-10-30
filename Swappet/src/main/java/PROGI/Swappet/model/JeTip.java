package PROGI.Swappet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "jetip")
@IdClass(JeTipId.class)
public class JeTip {

    @Id
    @Column(name = "iddog", nullable = false)
    private Integer idDog;

    @Id
    @Column(name = "idoglas", nullable = false)
    private Integer idOglas;

    // Getteri i setteri
    //...
}
