package PROGI.Swappet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "volitip")
@IdClass(VoliTipId.class)
public class VoliTip {

    @Id
    @Column(name = "email", nullable = false)
    private String email;

    @Id
    @Column(name = "iddog", nullable = false)
    private Integer idDog;

// Getteri i setteri
//...
}