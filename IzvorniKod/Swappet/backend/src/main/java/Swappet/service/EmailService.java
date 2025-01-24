package Swappet.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Value("${MAIL_USERNAME:#{null}}")
    private String mailUsername;

    @Value("${MAIL_PASSWORD:#{null}}")
    private String mailPassword;

    private boolean emailEnabled;

    // provjeri je li email usluga dostupna
    @PostConstruct
    public void checkEmailEnabled() {
        emailEnabled = mailUsername != null && !mailUsername.isBlank() &&
                mailPassword != null && !mailPassword.isBlank();
        if (!emailEnabled) {
            System.err.println("Email usluga nije dostupna. Postavke e-pošte nisu konfigurirane.");
        }
    }

    // obavijesti korisnika da je ulaznica prodana
    @Async
    public void notifyTicketSold(String recipientEmail, String opis, Integer numberOfTickets) {

        // provjera je li email usluga dostupna
        if (!emailEnabled) {
            System.err.println("Email usluga nije dostupna. Neuspješno slanje");
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Vaša ulaznica je prodana");
        message.setText("Poštovani,\n\n" +
                "Obavještavamo Vas da je ulaznica za događaj \"" + opis + "\" prodana.\n\n" +
                "Detalji prodaje:\n" +
                "- Naziv događaja: " + opis + "\n" +
                "- Broj prodanih ulaznica: " + numberOfTickets + "\n\n" +
                "Hvala što koristite Swappet.\n\n" +
                "Srdačan pozdrav,\n" +
                "Vaš Swappet tim");

        // posalji mail
        emailSender.send(message);
    }

    // obavijesti korisnika da mu je poslan zahtjev za razmjenu ulaznica
    @Async
    public void notifyExchangeRequest(String senderEmail, String recipientEmail, String senderOpis,
                                      String recipientOpis, Integer numberOfTickets) {

        // provjera je li email usluga dostupna
        if (!emailEnabled) {
            System.err.println("Email usluga nije dostupna. Neuspješno slanje");
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject("Zahtjev za razmjenu ulaznica");
        message.setText("Poštovani,\n\n" +
                "Korisnik " + senderEmail + " poslao Vam je zahtjev za razmjenu ulaznica.\n\n" +
                "Detalji zahtjeva:\n" +
                "- Vaš događaj: " + recipientOpis + "\n" +
                "- Događaj korisnika: " + senderOpis + "\n" +
                "- Broj ulaznica za razmjenu: " + numberOfTickets + "\n\n" +
                "Ako želite prihvatiti ili odbiti ovu ponudu, prijavite se na svoj račun na platformi Swappet.\n\n" +
                "Hvala što koristite Swappet!\n\n" +
                "Srdačan pozdrav,\n" +
                "Vaš Swappet tim");

        // posalji mail
        emailSender.send(message);
    }

    // obavijesti oba korisnika da je razmjena uspješno obavljena
    @Async
    public void notifySuccessfulExchange(String user1Email, String user2Email,
                                         String user1Opis, String user2Opis,
                                         Integer numberOfTickets) {

        // provjera je li email usluga dostupna
        if (!emailEnabled) {
            System.err.println("Email usluga nije dostupna. Neuspješno slanje.");
            return;
        }

        // obavijest za prvog korisnika
        SimpleMailMessage firstMessage = new SimpleMailMessage();
        firstMessage.setTo(user1Email);
        firstMessage.setSubject("Razmjena uspješno završena");
        firstMessage.setText("Poštovani,\n\n" +
                "Vaša razmjena ulaznica je uspješno završena!\n\n" +
                "Detalji razmjene:\n" +
                "- Vaš događaj: " + user1Opis + "\n" +
                "- Događaj drugog korisnika: " + user2Opis + "\n" +
                "- Broj razmijenjenih ulaznica: " + numberOfTickets + "\n\n" +
                "Hvala što koristite Swappet!\n\n" +
                "Srdačan pozdrav,\n" +
                "Vaš Swappet tim");

        // obavijest za drugog korisnika
        SimpleMailMessage secondMessage = new SimpleMailMessage();
        secondMessage.setTo(user2Email);
        secondMessage.setSubject("Razmjena uspješno završena");
        secondMessage.setText("Poštovani,\n\n" +
                "Vaša razmjena ulaznica je uspješno završena!\n\n" +
                "Detalji razmjene:\n" +
                "- Vaš događaj: " + user2Opis + "\n" +
                "- Događaj drugog korisnika: " + user1Opis + "\n" +
                "- Broj razmijenjenih ulaznica: " + numberOfTickets + "\n\n" +
                "Hvala što koristite Swappet!\n\n" +
                "Srdačan pozdrav,\n" +
                "Vaš Swappet tim");

        // posalji mailove
        emailSender.send(firstMessage);
        emailSender.send(secondMessage);
    }
}
