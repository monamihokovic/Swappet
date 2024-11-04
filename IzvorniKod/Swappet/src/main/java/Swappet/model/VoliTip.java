package Swappet.model;

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

    public VoliTip(String email, Integer idDog) {
        this.email = email;
        this.idDog = idDog;
    }

    public VoliTip() {
    }

    public Integer getIdDog() {
        return idDog;
    }

    public void setIdDog(Integer idDog) {
        this.idDog = idDog;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}