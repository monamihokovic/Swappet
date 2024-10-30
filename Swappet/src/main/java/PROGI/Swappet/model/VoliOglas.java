package PROGI.Swappet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "volioglas")
@IdClass(VoliOglasId.class)
public class VoliOglas {

    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Id
    @Column(name = "idoglas", nullable = false)
    private Integer idOglas;

    @Column(name = "voli", nullable = false)
    private Integer voli;

// Getteri i setteri
//...
}
