# Swappet

Ovaj projekt je rezultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu.

Glavni cilj web aplikacije nije samo uspješna preprodaja ulaznica, već i zamjena istih.

Kupnja ulaznice za bilo koju vrstu događanja, bilo da se radi o sportskom događaju, koncertu ili predstavi, danas je poprilično jednostavna. Problem nastaje kada se vaši planovi promijene. Zbog nemogućnosti zamjene ili preprodaje ulaznica, mnogi se pitaju ima li uopće smisla kupovati ulaznice unaprijed. 

Swappet je idealno rješenje koje će omogućiti korisnicima izravnu razmjenu jedan-na-jedan ili olakšati razmjenu između više sudionika ako se pronađu prikladna podudaranja.

---

### Funkcionalni zahtjevi sustava
Naša web aplikacija zamišljena je tako da omogućava korisnicima jednostavno upravljanje događajima, razmjenu i prodaju ulaznica te povezivanje s drugim korisnicima. Evo ključnih funkcionalnosti koje podržava aplikacija:

- **Prijava i registracija korisnika:**  
   Registracija korisnika omogućena je putem prijave preko Google naloga, čime se izbjegava ručni unos podataka kao što su korisničko ime, e-mail adresa i lozinka. Prijavom putem Google naloga korisnik automatski aktivira svoj profil i može započeti korištenje aplikacije.

- **Pristup i interakcija s oglasima:**  
   - **Neregistrirani korisnici** mogu pregledavati popis događaja i oglase za ulaznice, te pristupiti opcijama za prijavu i registraciju putem Google naloga.
   - **Registrirani korisnici** imaju dodatne mogućnosti, poput objavljivanja i uređivanja oglasa za prodaju ili zamjenu ulaznica, odgovaranja na tuđe oglase, korištenja filtara za pretragu oglasa te započinjanja interakcije s drugim korisnicima za kupnju ili zamjenu ulaznica. Oglasi uključuju sve ključne podatke kao što su vrsta, naziv, datumi i mjesto događaja, uz opcionalne informacije poput broja sjedala i vrste ulaznica.

- **Komunikacija među korisnicima:**  
   Unutar aplikacije omogućena je razmjena obavijesti među korisnicima, koje su odmah vidljive aktivnim korisnicima. Obavijesti o novim oglasima relevantnim za interese korisnika šalju se putem emaila i unutar aplikacije.

- **Praćenje preferencija korisnika:**  
   Aplikacija prati "lajkove" i "dislajkove" na oglase, prilagođavajući prikaz sadržaja na temelju korisničkih preferencija.

- **Pregled i upravljanje transakcijama:**  
   Registrirani korisnici imaju mogućnost pregledavanja povijesti svojih transakcija, dok sustav automatski popunjava podatke za nove transakcije na temelju prethodnih interakcija.

- **Automatsko uklanjanje i ažuriranje oglasa:**  
   Oglasi se automatski uklanjaju nakon isteka datuma događaja, a za glazbene koncerte sustav automatski preuzima informacije o izvođaču i glazbenom žanru iz vanjske aplikacije.

- **Vanjske integracije:**  
   Aplikacija se povezuje s vanjskim servisima kako bi korisnicima pružila dodatne informacije o izvođačima i vremenskim uvjetima na dan događaja, omogućavajući lakše planiranje dolaska na događaj.

- **Uloga administratora:**  
   Administrator sustava ima ključnu ulogu u održavanju aplikacije, uključujući generiranje izvještaja o korisničkim aktivnostima i prijavama za lažno oglašavanje, upravljanje korisničkim računima, rješavanje sporova i deaktivaciju računa po potrebi.


---

### Nefunkcionalni zahtjevi sustava
Naša web aplikacija dizajnirana je s naglaskom na korisničko iskustvo, sigurnost i prilagodljivost različitim uređajima, kako bi korisnicima omogućila što lakše i učinkovitije korištenje.

- **Korisničko iskustvo i prilagodljivost:**  
   Dizajn aplikacije izrađen je s ciljem jednostavnosti korištenja, uz prilagodbu različitim korisničkim potrebama. 

- **Prilagodljiv dizajn (responsive design):**  
   Aplikacija je prilagođena različitim veličinama ekrana i uređajima (od pametnih telefona do računala), osiguravajući konzistentno korisničko iskustvo bez obzira na vrstu uređaja.

- **Arhitektura klijent-poslužitelj:**  
   Aplikacija je razvijena prema klijent-poslužitelj arhitekturi, koja omogućava jasnu podjelu između klijentske strane (koja upravlja korisničkim sučeljem) i poslužiteljske strane (koja upravlja podacima i poslovnom logikom). 


---

## Tehnologije
Za učinkovitu komunikaciju unutar našeg tima koristimo Discord, koji nam omogućava brzu razmjenu ideja i suradnju u realnom vremenu. Za razvoj web aplikacije, odabrali smo React za frontend, što nam omogućava izradu interaktivnih i dinamičnih korisničkih sučelja. 

Na backend strani, koristimo Java i Spring framework. 

Ova kombinacija tehnologija omogućava nam da stvorimo efikasnu web aplikaciju koja zadovoljava potrebe naših korisnika.

## Članovi tima 
> Ivan Vjekoslav Rođak - voditelj, backend  
> Goran Torbica - backend  
> Mona Mihoković - backend, dokumentacija  
> Patrick Mraz - frontend  
> Maja Blažok - frontend  
> Dominik Mandić - baza podataka i vanjski resursi  
> Paško Zekić - dokumentacija  

## Kontribucije
Za vrijeme rada na projektu očekuje se praćenje etičkog kodeksa IEEE-a i kodeksa ponašanja.

## 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Članovi tima prate [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](CODE_OF_CONDUCT.md) i poštuju [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html).

# 📝 Licenca

Ovaj projekt licenciran je pod MIT licencom. Pogledati [LICENSE](LICENSE) datoteku za više detalja.

