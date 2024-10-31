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


    // kostruktor
    public JeUkljucen(String email, Integer odluka) {
        this.email = email;
        this.odluka = odluka;
    }

    public JeUkljucen() {

    }

    // Getteri i setteri
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getIdTransakcija() {
        return idTransakcija;
    }

    public Integer getOdluka() {
        return odluka;
    }

    public void setOdluka(Integer odluka) {
        this.odluka = odluka;
    }
}