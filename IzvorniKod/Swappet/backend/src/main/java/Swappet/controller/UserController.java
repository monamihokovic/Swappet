package Swappet.controller;

import Swappet.model.Transakcija;
import Swappet.service.OglasService;
import Swappet.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "https://swappet-app-iod2.onrender.com", allowCredentials = "true")
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
    public ResponseEntity<List<TradeDTO>> getUserTrades(@PathVariable String email) {
        List<TradeDTO> oglasi = oglasService.getUserTrades(email);
        return ResponseEntity.ok(oglasi);
    }

    @PostMapping("/user/activation")
    public ResponseEntity<String> activateOglas(@RequestBody Map<String, Integer> payload) {
        Integer idOglas = payload.get("id");
        Integer activation = payload.get("activation");
        userService.oglasActivation(idOglas, activation);
        if (activation == -10) {
            return ResponseEntity.ok("Oglas reaktiviran");
        } else if (activation == -1) {
            return ResponseEntity.ok("Oglas deaktiviran");
        }else{
<<<<<<< HEAD
            return ResponseEntity.ok("Loša vrijednost, pokušaj ponovno");
=======
            return ResponseEntity.ok("Loša vrijednost, pokušaj ponovno")
>>>>>>> 39785b8f209a35c9a4aa4285a1517098630c8f69
        }
    }

    @GetMapping("/set-cookie")
    public String setCookie(@AuthenticationPrincipal OAuth2User principal, HttpServletResponse response) {

        String sessionId = principal != null ? principal.getName() : "guest";

        response.addHeader("Set-Cookie", "SESSIONID=" + sessionId + "; HttpOnly; Secure; Path=/; Domain=swappet-backend.onrender.com; Max-Age=86400; SameSite=None");

        return "Cookie Set for user: " + sessionId;
    }

}