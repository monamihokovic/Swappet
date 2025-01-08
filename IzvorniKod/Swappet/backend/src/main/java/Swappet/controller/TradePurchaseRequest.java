package Swappet.controller;

import java.util.List;

public class TradePurchaseRequest {

    private String buyerEmail;
    private String sellerEmail;
    private List<Integer> sellerTickerIds;
    private List<Integer> buyerTickerIds;
    private Integer decision;

    public String getBuyerEmail() {
        return buyerEmail;
    }

    public void setBuyerEmail(String buyerEmail) {
        this.buyerEmail = buyerEmail;
    }

    public String getSellerEmail() {
        return sellerEmail;
    }

    public void setSellerEmail(String sellerEmail) {
        this.sellerEmail = sellerEmail;
    }

    public List<Integer> getSellerTickerIds() {
        return sellerTickerIds;
    }

    public void setSellerTickerIds(List<Integer> sellerTickerIds) {
        this.sellerTickerIds = sellerTickerIds;
    }

    public List<Integer> getBuyerTickerIds() {
        return buyerTickerIds;
    }

    public void setBuyerTickerIds(List<Integer> buyerTickerIds) {
        this.buyerTickerIds = buyerTickerIds;
    }

    public Integer getDecision() {
        return decision;
    }

    public void setDecision(Integer decision) {
        this.decision = decision;
    }
}
