package Swappet.model;

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


    public VoliOglas(String email, Integer voli, Integer idOglas) {
        this.email = email;
        this.voli = voli;
        this.idOglas = idOglas;
    }

    public VoliOglas() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getIdOglas() {
        return idOglas;
    }

    public void setIdOglas(Integer idOglas) {
        this.idOglas = idOglas;
    }

    public Integer getVoli() {
        return voli;
    }

    public void setVoli(Integer voli) {
        this.voli = voli;
    }
}
