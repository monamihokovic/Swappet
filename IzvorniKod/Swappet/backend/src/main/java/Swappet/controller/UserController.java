package Swappet.controller;

import Swappet.model.Transakcija;
import Swappet.service.OglasService;
import Swappet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private OglasService oglasService;

    @GetMapping("/user-info")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes();
    }

    @GetMapping("/info")
    public String user1(@AuthenticationPrincipal OAuth2User principal) {
        return "Pitaj boga";
    }

    @GetMapping("/user/transaction/{email}")
    public ResponseEntity<List<Transakcija>> getUserTransaction(@PathVariable String email) {
        List<Transakcija> transakcije = userService.getUserTransactions(email);
        return ResponseEntity.ok(transakcije);
    }

    @GetMapping("/user/oglasi/{email}")
    public ResponseEntity<List<OglasDTO>> getUserOglasi(@PathVariable String email) {
        List<OglasDTO> oglasi = oglasService.getAllOglasi(email);
        return ResponseEntity.ok(oglasi);
    }

    @GetMapping("/user/trades/{email}")
    public ResponseEntity<List<OglasDTO>> getUserTrades(@PathVariable String email) {
        List<OglasDTO> oglasi = oglasService.getUserTrades(email);
        return ResponseEntity.ok(oglasi);
    }

}