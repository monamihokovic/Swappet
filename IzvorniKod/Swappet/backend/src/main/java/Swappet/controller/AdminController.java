package Swappet.controller;

import Swappet.model.Transakcija;
import Swappet.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    //ruta za vraćanje liste admina iz baze na frontend
    @GetMapping("/")
    public ResponseEntity<List<String>> getAdmins() {
        List<String> admini = adminService.getAllAdmini();
        return ResponseEntity.ok(admini);
    }

    //ruta za dodavanje novih admina u bazu
    @GetMapping("/add")
    public ResponseEntity<String> addAdmin(@RequestParam String admin, @RequestParam String email) {
        if (checkAdmin(admin)) {
            adminService.addAdmin(email);
            return ResponseEntity.ok("Dodan admin: " + email);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Korisnik nije admin");
        }
    }

    //ruta kojom vraćamo sve oglase iz baze na frontend
    @GetMapping("/oglasi/{email}")
    public ResponseEntity<List<OglasDTO>> getAllOglasi(@PathVariable String email) {
        if (checkAdmin(email)) {
            List<OglasDTO> oglasi = adminService.getAllOglasi();
            return ResponseEntity.ok(oglasi);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Collections.emptyList());
        }
    }

    //ruta kojom na frontend vraćamo sve transakcije iz baze
    @GetMapping("/transakcije/{email}")
    public ResponseEntity<List<Transakcija>> getAllTransakcije(@PathVariable String email) {
        if (checkAdmin(email)) {
            List<Transakcija> transakcija = adminService.getAllTransactions();
            return ResponseEntity.ok(transakcija);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Collections.emptyList());
        }
    }

    //na ovoj ruti se generira izjveštaj u pdf formatu
    @PostMapping("/report/{email}")
    public ResponseEntity<byte[]> reportPdf(@PathVariable String email) {
        if (checkAdmin(email)) {
            byte[] pdffile = adminService.generateReport();
            if (pdffile != null) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report.pdf")
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(pdffile);
            } else {
                return ResponseEntity.status(500).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(null);
        }
    }

    //ovom rutom, kao admin, aktiviramo ili deaktiviramo oglase
    @PostMapping("/activation/{email}")
    public ResponseEntity<String> oglasActivation(@RequestBody Map<String, Integer> payload, @PathVariable String email) {
        if (checkAdmin(email)) {
            Integer idOglas = payload.get("id");
            Integer activation = payload.get("activation");
            adminService.activationRequest(idOglas, activation);
            if (activation > 0) {
                return ResponseEntity.ok("Oglas reaktiviran");
            } else {
                return ResponseEntity.ok("Oglas deaktiviran");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Korisnik nije admin");
        }
    }

    //ovom rutom na frontend vraćamo sve reportane korisnike iz baze
    @GetMapping("/guilty/{email}")
    public ResponseEntity<List<String>> getGuilty(@PathVariable String email) {
        if (checkAdmin(email)) {
            List<String> guiltyUsers = adminService.reportedUsers();
            return ResponseEntity.ok(guiltyUsers);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Collections.emptyList());
        }
    }

    //ovom rutom bannamo korisnike
    @PostMapping("/ban/{email}")
    public ResponseEntity<String> userBan(@RequestBody BanRequest banRequest, @PathVariable String email) {
        if (checkAdmin(email)) {
            adminService.banUser(banRequest.getEmail(), banRequest.getBan());
            if (banRequest.getBan() > 0) {
                return ResponseEntity.ok("User freed");
            } else {
                return ResponseEntity.ok("User banned");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Korisnik nije admin");
        }
    }

    //pomoćna funkcija kojom provjeravamo je li ulogirani korisnik zaista jedan od admina
    private boolean checkAdmin(String email) {
        List<String> admins = adminService.getAllAdmini();
        if (admins.contains(email)) {
            return true;
        } else {
            return false;
        }
    }
}