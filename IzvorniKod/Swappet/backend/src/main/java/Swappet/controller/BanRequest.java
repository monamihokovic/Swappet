package Swappet.controller;

public class BanRequest {

    private String email;
    private Integer ban;

    public BanRequest(String email, Integer ban) {
        this.email = email;
        this.ban = ban;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getBan() {
        return ban;
    }

    public void setBan(Integer ban) {
        this.ban = ban;
    }
}
