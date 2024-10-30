package PROGI.Swappet.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipdog")
public class TipDog {

    @Id
    @Column(name = "iddog", nullable = false)
    private Integer idDog;

    @Column(name = "nazivtipa", length = 100, nullable = false)
    private String nazivtipa;

    // Getteri i setteri
    //...

}
