package Swappet.controller;

import java.util.List;

class TicketPurchaseRequest {
    private String buyerEmail;
    private List<Integer> ticketIds;

    // Getters and Setters
    public String getBuyerEmail() {
        return buyerEmail;
    }

    public void setBuyerEmail(String buyerEmail) {
        this.buyerEmail = buyerEmail;
    }

    public List<Integer> getTicketIds() {
        return ticketIds;
    }

    public void setTicketIds(List<Integer> ticketIds) {
        this.ticketIds = ticketIds;
    }
}
