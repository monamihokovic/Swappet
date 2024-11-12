# Swappet

U svrhu izrade projektnog zadatka kolegija Programsko inženjerstvo, na temu web aplikacije ,,Preprodaja i razmjena karata i ulaznica", izrađena je web aplikacija Swappet. 

Glavni cilj web aplikacije nije samo uspješna preprodaja ulaznica, već i zamjena istih.

Kupnja ulaznice za bilo koju vrstu događanja, bilo da se radi o sportskom događaju, koncertu ili predstavi, danas je poprilično jednostavna. Problem nastaje kada se vaši planovi promijene. Zbog nemogućnosti zamjene ili preprodaje ulaznica, mnogi se pitaju ima li uopće smisla kupovati ulaznice unaprijed. 

Swappet je idealno rješenje koje će omogućiti korisnicima izravnu razmjenu jedan-na-jedan ili olakšati razmjenu između više sudionika ako se pronađu prikladna podudaranja.

## Funkcionalni zahtjevi sustava
Naša web aplikacija zamišljena je s funkcijama prijave korisnika, podrškom za više korisnika u isto vrijeme te slanjem obavijesti unutar aplikacije između korisnika, koje su aktualne i odmah vidljive aktivnim korisnicima.

Neregistrirani korisnici mogu pregledavati popis događaja, gledati oglase za ulaznice i pristupiti stvaranju korisničkog računa. Registracija korisnika započinje unosom korisničkog imena i email adrese, nakon čega sustav šalje link za aktivaciju računa. Prilikom aktivacije korisnik unosi lozinku.

Registrirani korisnici imaju dodatne mogućnosti. Mogu biti prodavači u jednoj transakciji i kupci u drugoj, pregledavati popis događaja i oglase za ulaznice te koristiti filtre za pronalazak željenih oglasa. Također mogu odgovarati na tuđe oglase, objavljivati oglase za zamjenu ili prodaju ulaznica, a imaju i pristup potencijalnim lancima razmjene za tuđe oglase. Registrirani korisnici mogu ,,lajkati" ili ,,dislajkati" oglase te započinjati interakciju prilikom kupnje ili zahtjeva za zamjenu ulaznice. 

Na taj način, naša web aplikacija osigurava jednostavno i učinkovito iskustvo za sve korisnike.

Transakcija sadržava podatke o uključenim korisnicima, odlukama, vrsti te vremenski okvir odluke.

Platforma se povezuje na vanjski servis s katalogom izvođača, čime korisnici mogu lako pristupiti informacijama o izvođačima. Također, integrira se s vanjskom uslugom za vremensku prognozu, što omogućava korisnicima da budu informirani o vremenskim uvjetima na dan događaja.

Registriranim korisnicima prikaz se prilagođava ovisno o njihovim preferencijama, temeljenim na ,,lajkovima" i ,,dislajkovima". Obavijesti se šalju putem emaila i unutar aplikacije, a korisnici su obaviješteni o novim oglasima koji odgovaraju njihovim interesima. Također, mogu pregledati svoje prošle transakcije, a sustav automatski popunjava podatke o transakciji na temelju detektirane interakcije.

Kada je riječ o oglasima, oni sadrže sve bitne informacije kao što su vrsta, naziv, datumi i mjesto događaja, uz opcionalne podatke o broju sjedala i vrsti ulaznica. U slučaju zamjene, korisnici mogu navesti željeni događaj ili vrstu ulaznice koja će se prihvatiti kao zamjena. Oglasi se automatski uklanjaju istekom datuma događaja, a ako se radi o glazbenom koncertu, sustav automatski preuzima podatke o izvođaču i žanru iz vanjske aplikacije.

Administrator sustava ima ključnu ulogu u upravljanju aplikacijom. Generira izvještaje o aktivnostima korisnika, razmjenama ulaznica i prijavama o lažnom oglašavanju. Također, upravlja korisničkim računima, rješava sporove te deaktivira račune korisnika kada je to potrebno.

Ove funkcionalnosti osiguravaju da naša web aplikacija bude korisna, efikasna i prilagođena potrebama svih korisnika. 

## Nefunkcionalni zahtjevi sustava
Naša web aplikacija je dizajnirana s naglaskom na korisničko iskustvo i fleksibilnost. 

Prvo, aplikacija je prilagođena različitim veličinama ekrana putem responsive designa, što omogućava korisnicima da je koriste na raznim uređajima, uključujući pametne telefone, tablete i računala.

Drugo, aplikacija je izvedena u arhitekturi klijent-poslužitelj. Ova arhitektura omogućava jasnu podjelu između klijentske strane, koja se brine za interakciju s korisnicima, i poslužiteljske strane, koja upravlja podacima i logikom aplikacije.
Sve ove karakteristike čine našu web aplikaciju modernom i prilagodljivom potrebama korisnika.

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
>Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md



## 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvaćenih kodeksa ponašanja za rad u zajednici otvorenog koda.

# 📝 Licenca
Važeća (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

### Reference na licenciranje repozitorija
