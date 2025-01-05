package Swappet.controller;

import Swappet.model.Oglas;
import Swappet.model.Transakcija;
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

    @GetMapping("/user-info")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes();
    }

    @GetMapping("/info")
    public String user1(@AuthenticationPrincipal OAuth2User principal) {
        return "Pitaj boga";
    }

    /*@GetMapping("/user/transaction/{email}")
    public ResponseEntity<List<Transakcija>> getUserTransaction(@PathVariable String email) {
        List<Transakcija> transakcije = userService.getUserTransactions(email);
        return ResponseEntity.ok(transakcije);
    }*/

    /*@GetMapping("user/oglasi/{email}")
    public ResponseEntity<List<Oglas>> getUserOglasi(@PathVariable String email) {
        List<Oglas> oglasi = userService.getUserOglas(email);
        return ResponseEntity.ok(oglasi);
    }*/
}