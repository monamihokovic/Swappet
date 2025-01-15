package Swappet.controller;

import Swappet.model.Oglas;
import Swappet.model.Transakcija;
import Swappet.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}