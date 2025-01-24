package Swappet.controller;

public class OglasDTO {

    private int id;  // idOglas iz Oglasa
    private String description;  // opis iz Oglasa
    private String type;  // tipOglas iz Oglasa
    private Double price;  // cijena iz Ulaznice
    private String address;  // combination ulice i grada iz Oglasa
    private String date;  // datum iz Oglasa
    private Integer numberOfTickets; // broj ulaznica
    private Integer ticketType; // tip ulaznice
    private Integer broj;
    private Integer red;
    private Integer eventType;
    private String email; // email prodavača
    private String tradeDescription; //opis zamjene
    private Integer liked; // korisnik može lajkati, dislajkati, reportati oglas

    //numberOfTIckets = aktivan

    public OglasDTO(int id, String description, String type, Double price, String address, String date, Integer numberOfTickets, Integer ticketType, Integer broj, Integer red, Integer eventType, String email, String tradeDescription, Integer liked) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.price = price;
        this.address = address;
        this.date = date;
        this.numberOfTickets = numberOfTickets;
        this.ticketType = ticketType;
        this.broj = broj;
        this.red = red;
        this.eventType = eventType;
        this.email = email;
        this.tradeDescription = tradeDescription;
        this.liked = liked;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getNumberOfTickets() {
        return numberOfTickets;
    }

    public void setNumberOfTickets(int numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }

    public Integer getTicketType() {
        return ticketType;
    }

    public void setTicketType(int ticketType) {
        this.ticketType = ticketType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTradeDescription() {
        return tradeDescription;
    }

    public void setTradeDescription(String tradeDescription) {
        this.tradeDescription = tradeDescription;
    }

    public Integer getBroj() {
        return broj;
    }

    public void setBroj(Integer broj) {
        this.broj = broj;
    }

    public Integer getRed() {
        return red;
    }

    public void setRed(Integer red) {
        this.red = red;
    }

    public void setTicketType(Integer ticketType) {
        this.ticketType = ticketType;
    }

    public void setNumberOfTickets(Integer numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }

    public Integer geteventType() {
        return eventType;
    }

    public void seteventType(Integer eventType) {
        this.eventType = eventType;
    }

    public Integer getLiked() {
        return liked;
    }

    public void setLiked(Integer liked) {
        this.liked = liked;
    }

    @Override
    public String toString() {
        return "OglasDTO{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", address='" + address + '\'' +
                ", date='" + date + '\'' +
                ", numberOfTickets=" + numberOfTickets +
                ", ticketType=" + ticketType +
                ", broj=" + broj +
                ", red=" + red +
                ", eventType=" + eventType +
                ", email='" + email + '\'' +
                ", tradeDescription='" + tradeDescription + '\'' +
                ", liked=" + liked +
                '}';
    }

}