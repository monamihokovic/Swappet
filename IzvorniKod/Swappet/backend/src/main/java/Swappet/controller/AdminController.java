package Swappet.controller;

import Swappet.model.Spor;
import Swappet.model.Transakcija;
import Swappet.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/oglasi")
    public ResponseEntity<List<OglasDTO>> getAllOglasi() {
        List<OglasDTO> oglasi = adminService.getAllOglasi();
        return ResponseEntity.ok(oglasi);
    }

    @GetMapping("/transakcije")
    public ResponseEntity<List<Transakcija>> getAllTransakcije() {
        List<Transakcija> transakcija = adminService.getAllTransactions();
        return ResponseEntity.ok(transakcija);
    }

    @GetMapping("/report")
    public ResponseEntity<byte[]> reportPdf() {
        byte[] pdffile = adminService.generateReport();
        if (pdffile != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdffile);
        } else {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/activation")
    public ResponseEntity<String> oglasActivation(@RequestBody Map<String, Integer> payload) {
        Integer idOglas = payload.get("idOglas");
        Integer activation = payload.get("activation");
        adminService.activationRequest(idOglas, activation);
        if (activation > 0) {
            return ResponseEntity.ok("Oglas reaktiviran");
        } else {
            return ResponseEntity.ok("Oglas deaktiviran");
        }
    }

    @PostMapping("/ban")
    public ResponseEntity<String> userBan(@RequestBody BanRequest banRequest) {

        if (banRequest.getBan() > 0) {
            return ResponseEntity.ok("User freed");
        } else {
            return ResponseEntity.ok("User banned");
        }
    }
}