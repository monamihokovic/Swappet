package Swappet.controller;

import Swappet.model.Oglas;
import Swappet.model.Ulaznica;
import Swappet.service.UlaznicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ulaznica")
public class UlaznicaController {

    @Autowired
    private UlaznicaService ulaznicaService;

    // vraća sve ulaznice iz baze
    @GetMapping("/all")
    public ResponseEntity<List<Ulaznica>> getAllUlaznice() {
        List<Ulaznica> ulaznice = ulaznicaService.getAllUlaznice();
        return ResponseEntity.ok(ulaznice);
    }

    // Kupnja ulaznica (1 ili više)
    @PostMapping("/kupnja")
    public ResponseEntity<String> purchaseTickets(@RequestBody TicketPurchaseRequest request) {
        ulaznicaService.purchaseTickets(request.getBuyerEmail(), request.getTicketIds());
        return ResponseEntity.ok("Ulaznica/e uspješno kupljena/e.");
    }

    //potvrda razmjene
    @PostMapping("/razmjena")
    public ResponseEntity<String> confirmTrade(@RequestBody TradePurchaseRequest request) {
        ulaznicaService.tradeConfirmation(
                request.getSellerId(),
                request.getBuyerId(),
                request.getAmount(),
                request.getDecision()
        );

        if (request.getDecision() == 1) {
            return ResponseEntity.ok("Ulaznica/e uspješno razmjenjene");
        } else {
            return ResponseEntity.ok("Razmjena odbijena");
        }
    }

    //obrada zahtjeva za razmjenu
    @PostMapping("/podnesi-razmjenu")
    public ResponseEntity<String> submitExchangeAd(@RequestBody Map<String, Integer> payload) {
        Integer sellerId = payload.get("sellerAd");
        Integer buyerId = payload.get("buyerAd");
        Integer amount = payload.get("count");
        ulaznicaService.submitExchangeAd(sellerId, buyerId, amount);
        return ResponseEntity.ok("Oglas razmjene uspješno podnesen.");
    }

    //vraća sve oglase za razmjenu od zadanog korisnika
    @PostMapping("/razmjene")
    public ResponseEntity<List<Oglas>> retrieveExchangeAds(@RequestBody Map<String, String> payload) {
        String mail = payload.get("mail");
        List<Oglas> exchangeAds = ulaznicaService.getExchangeAds(mail);
        return ResponseEntity.ok(exchangeAds);
    }
}