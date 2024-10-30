package PROGI.Swappet.model;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "transakcija")
public class Transakcija {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtransakcija", nullable = false)
    private Integer idTransakcija;

    @Column(name = "uspjesna", nullable = false)
    private Integer uspjesna;

    @Column(name = "dvpocetak", nullable = false)
    private LocalDateTime dvPocetak;

    @ManyToOne
    @JoinColumn(name = "idulaznica", nullable = false)
    private Ulaznica ulaznica;

    // Getteri i setteri
    //...
}
