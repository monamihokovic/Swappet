package Swappet.service;

import Swappet.controller.OglasDTO;
import Swappet.model.Oglas;
import Swappet.model.Transakcija;
import Swappet.repository.JeTipRepository;
import Swappet.repository.OglasRepository;
import Swappet.repository.TransakcijaRepository;
import Swappet.repository.UlaznicaRepository;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private OglasRepository oglasRepository;

    @Autowired
    private TransakcijaRepository transakcijaRepository;

    @Autowired
    private UlaznicaRepository ulaznicaRepository;
    
    @Autowired
    private JeTipRepository jeTipRepository;

    public List<OglasDTO> getAllOglasi() {
        List<Object[]> rawData = oglasRepository.findAllOglasi();
        List<OglasDTO> result = new ArrayList<>();

        for (Object[] row : rawData) {
            Oglas oglas = (Oglas) row[0];  // Oglas objekt
            Double price = (Double) row[1];  // cijena iz Ulaznice

            //formatiraj adresu
            String address = oglas.getUlica() + ", " + oglas.getGrad();

            //formatiraj datum po potrebu
            String date = oglas.getDatum().toString();

            // dohvati broj ulaznica za taj oglas
//            Integer numberOfTickets = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).size();
            Integer numberOfTickets = oglas.getAktivan();

            // dohvati tip ulaznice
            Integer ticketType = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).getFirst().getVrstaUlaznice();

            //dohvati red sjedala
            Integer red = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).getFirst().getRed();

            //dohvati broj sjedala
            Integer broj = ulaznicaRepository.findUlazniceByOglas(oglas.getIdOglas()).getFirst().getBroj();

            // dohvati email prodavača
            String email = oglas.getKorisnik().getEmail();

            //dohvati opis zamjene
            String tradeDescription = oglas.getOpisZamjene();

            Integer eventType = jeTipRepository.findByIdOglas(oglas.getIdOglas()).getIdDog();
            
            //konvertiraj u DTO
            OglasDTO dto = new OglasDTO(
                    oglas.getIdOglas(),
                    oglas.getOpis(),
                    oglas.getTipOglas().toString(),
                    price,
                    address,
                    date,
                    numberOfTickets,
                    ticketType,
                    broj,
                    red,
                    eventType,
                    email,
                    tradeDescription
                );

            result.add(dto);
        }

        return result;
    }

    public List<Transakcija> getAllTransactions() {
        return transakcijaRepository.findAll();
    }

    public byte[] generateReport() {
        List<Transakcija> transactions = transakcijaRepository.reportTransactions();
        int brojOglasa = oglasRepository.findRelevantOglasi().size();
        int brojUlaznica = transactions.size();
        double avgcijena = 0;

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(outputStream);

            com.itextpdf.kernel.pdf.PdfDocument pdf = new com.itextpdf.kernel.pdf.PdfDocument(writer);
            Document document = new Document(pdf);
            document.add(new Paragraph("Izvještaj generiran dana " + LocalDate.now()));

            for (Transakcija transakcija : transactions) {
                int id = transakcija.getIdTransakcija();
                String uspjesnost = "Greška";
                if (transakcija.getUspjesna() > 0) {
                    uspjesnost = "Uspješna";
                } else if (transakcija.getUspjesna() < 0) {
                    uspjesnost = "Neuspješna";
                } else if (transakcija.getUspjesna() == 0) {
                    uspjesnost = "Na čekanju";
                }
                String datum = transakcija.getDvPocetak().toString();
                int idulaznica = transakcija.getUlaznica().getIdUlaznica();
                double cijena = transakcija.getUlaznica().getCijena();
                avgcijena += cijena;

                document.add(new Paragraph("Id transakcije: " + id));
                document.add(new Paragraph("Uspjeh: " + uspjesnost));
                document.add(new Paragraph("Datum: " + datum));
                document.add(new Paragraph("Prodana ulaznica: " + idulaznica));
                document.add(new Paragraph("Cijena ulaznice: " + cijena));
                document.add(new Paragraph("\n"));
            }

            avgcijena = avgcijena / brojUlaznica;
            document.add(new Paragraph("Broj aktivnih oglasa: " + brojOglasa));
            document.add(new Paragraph("Broj prodanih ulaznica: " + brojUlaznica));
            document.add(new Paragraph("Prosječna cijena prodane ulaznice: " + String.format("%.2f", avgcijena)));

            document.close();
            byte[] pdfBytes = outputStream.toByteArray();

            return pdfBytes;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}