package PROGI.Swappet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "jeukljucen")
@IdClass(JeUkljucenId.class)
public class JeUkljucen {
    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Id
    @Column(name = "idtransakcija", nullable = false)
    private Integer idTransakcija;

    @Column(name = "odluka", nullable = false)
    private Integer odluka;

    // Getteri i setteri

}