package Swappet.controller;

public class TradePurchaseRequest {

    private Integer sellerId;    //id oglasa prodavača
    private Integer buyerId;    //id oglasa kupca
    private Integer decision;   //odluka; -1 -> odbijanje, 1 -> prihvaćanje
    private Integer amount;     //broj ulaznica

    public Integer getSellerId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
    }

    public Integer getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Integer buyerId) {
        this.buyerId = buyerId;
    }

    public Integer getDecision() {
        return decision;
    }

    public void setDecision(Integer decision) {
        this.decision = decision;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
