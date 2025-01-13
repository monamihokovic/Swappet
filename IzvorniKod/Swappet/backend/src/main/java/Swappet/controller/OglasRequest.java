package Swappet.controller;

public class OglasRequest {

    private String description;     //opis ulaznice
    private Integer categoryId; // id kategorije
    private Double price;    //cijena ulaznice
    private String street;  //ulica
    private String houseNumber; //kucni broj
    private String city;    //grad
    private String date; // datum događaja
    private String email; // email ulogiranog korisnika
    private Integer numberOfTickets; // broj ulaznica
    private Integer ticketType; // tip ulaznice
    private Integer type; //tip transakcije -> prodaja, zamjena ili lanac
    private String tradeDescription; //opis zamjene-
    private Integer red; //red sjedala, optional
    private Integer broj; //broj sjedala, optional


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getNumberOfTickets() {
        return numberOfTickets;
    }

    public void setNumberOfTickets(Integer numberOfTickets) {
        this.numberOfTickets = numberOfTickets;
    }

    public Integer getTicketType() {
        return ticketType;
    }

    public void setTicketType(Integer ticketType) {
        this.ticketType = ticketType;
    }

    public Integer getTransactionType() {
        return type;
    }

    public void setTransactionType(Integer transactionType) {
        this.type = transactionType;
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
}