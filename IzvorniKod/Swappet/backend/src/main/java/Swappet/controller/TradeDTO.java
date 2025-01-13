package Swappet.controller;

public class TradeDTO {
    private Integer sellerId; //id oglasa koji je ,,prodavač" stavio na razmjenu
    private String sellerAdDescription;     //opis oglasa prodavača (,,naslov")
    private String sellerTradeDescription;   //opis zamjene prodavača
    private Integer buyerId;    //id oglasa kojim ,,kupac" odgovara prodavaču
    private String buyerDescription;    //opis oglasa ,,kupca"
    private Integer quantity;   //količina karata

    public TradeDTO(Integer sellerId, String sellerAdDescription, String sellerTradeDescription, Integer buyerId, String buyerDescription, Integer quantity) {
        this.sellerId = sellerId;
        this.sellerAdDescription = sellerAdDescription;
        this.sellerTradeDescription = sellerTradeDescription;
        this.buyerId = buyerId;
        this.buyerDescription = buyerDescription;
        this.quantity = quantity;
    }

    public Integer getSellerId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
    }

    public String getSellerAdDescription() {
        return sellerAdDescription;
    }

    public void setSellerAdDescription(String sellerAdDescription) {
        this.sellerAdDescription = sellerAdDescription;
    }

    public String getSellerTradeDescription() {
        return sellerTradeDescription;
    }

    public void setSellerTradeDescription(String sellerTradeDescription) {
        this.sellerTradeDescription = sellerTradeDescription;
    }

    public Integer getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Integer buyerId) {
        this.buyerId = buyerId;
    }

    public String getBuyerDescription() {
        return buyerDescription;
    }

    public void setBuyerDescription(String buyerDescription) {
        this.buyerDescription = buyerDescription;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
