package Swappet.controller;

import Swappet.model.Oglas;
import Swappet.model.Ulaznica;
import Swappet.service.UlaznicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ulaznica")
public class UlaznicaController {

    @Autowired
    private UlaznicaService ulaznicaService;

    // Fetch all Ulaznica records
    @GetMapping("/all")
    public ResponseEntity<List<Ulaznica>> getAllUlaznice() {
        List<Ulaznica> ulaznice = ulaznicaService.getAllUlaznice();
        return ResponseEntity.ok(ulaznice);
    }

    // Fetch a specific Ulaznica by ID
    @GetMapping("/{id}")
    public ResponseEntity<Ulaznica> getUlaznicaById(@PathVariable Integer id) {
        Ulaznica ulaznica = ulaznicaService.getUlaznicaById(id);
        return ulaznica != null ? ResponseEntity.ok(ulaznica) : ResponseEntity.notFound().build();
    }

    // Kupnja ulaznica (1 ili više)
    @PostMapping("/kupnja")
    public ResponseEntity<String> purchaseTickets(@RequestBody TicketPurchaseRequest request) {
        ulaznicaService.purchaseTickets(request.getBuyerEmail(), request.getTicketIds());
        return ResponseEntity.ok("Ulaznica/e uspješno kupljena/e.");
    }

    @PostMapping("/razmjena")
    public ResponseEntity<String> confirmTrade(@RequestBody TradePurchaseRequest request) {
        ulaznicaService.tradeConfirmation(
                request.getSellerTickerIds(),
                request.getBuyerTickerIds(),
                request.getDecision()
        );
        if (request.getDecision() == 1) {
            return ResponseEntity.ok("Ulaznica/e uspješno razmjenjene");
        } else {
            return ResponseEntity.ok("Razmjena odbijena");
        }
    }

    @PostMapping("/podnesi-razmjenu")
    public ResponseEntity<String> submitExchangeAd(@RequestParam Integer idOglasBuyer, @RequestParam Integer idOglasSeller) {
        ulaznicaService.submitExchangeAd(idOglasBuyer, idOglasSeller);
        return ResponseEntity.ok("Oglas razmjene uspješno podnesen.");
    }

    @PostMapping("/razmjena")
    public ResponseEntity<List<Oglas>> retrieveExchangeAds(@RequestParam Integer idOglasSeller) {
        List<Oglas> exchangeAds = ulaznicaService.getExchangeAds(idOglasSeller);
        return ResponseEntity.ok(exchangeAds);
    }
}