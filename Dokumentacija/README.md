# Swappet

U svrhu izrade projektnog zadatka kolegija Programsko inženjerstvo, na temu web aplikacije "kupnja ulaznice za koncerte", izrađena je web aplikacija Swappet. 

Glavni cilj web aplikacije nije samo uspješna preprodaja ulaznica, već i zamjena istih.

Kupnja ulaznice za bilo koju vrstu događanja, bilo da se radi o sportskom događaju, koncertu ili predstavi, danas je poprilično jednostavna. Problem nastaje kada se vaši planovi promijene. Zbog nemogućnosti zamjene ili preprodaje ulaznica, mnogi se pitaju ima li uopće smisla kupovati ulaznice unaprijed. 

Swappet je idealno rješenje koje će omogućiti korisnicima izravnu razmjenu jedan-na-jedan ili olakšati razmjenu između više sudionika ako se pronađu prikladna podudaranja.

## Funkcionalni zahtjevi sustava
Naša web aplikacija zamišljena je s funkcijama prijave korisnika, podrškom za više korisnika u isto vrijeme te slanjem obavijesti unutar aplikacije između korisnika, koje su aktualne i odmah vidljive aktivnim korisnicima.

Neregistrirani korisnici mogu pregledavati popis događaja, gledati oglase za ulaznice i pristupiti stvaranju korisničkog računa. Registracija korisnika započinje unosom korisničkog imena i email adrese, nakon čega sustav šalje link za aktivaciju računa. Prilikom aktivacije korisnik unosi lozinku.

Registrirani korisnici imaju dodatne mogućnosti. Mogu biti prodavači u jednoj transakciji i kupci u drugoj, pregledavati popis događaja i oglase za ulaznice te koristiti filtre za pronalazak željenih oglasa. Također mogu odgovarati na tuđe oglase, objavljivati oglase za zamjenu ili prodaju ulaznica, a imaju i pristup potencijalnim lancima razmjene za tuđe oglase. Registrirani korisnici mogu "lajkati" ili "dislajkati" oglase te započinjati interakciju prilikom kupnje ili zahtjeva za zamjenu ulaznice. 

Na taj način, naša web aplikacija osigurava jednostavno i učinkovito iskustvo za sve korisnike.

Transakcija sadržava podatke o uključenim korisnicima, odlukama, vrsti te vremenski okvir odluke.

Platforma se povezuje na vanjski servis s katalogom izvođača, čime korisnici mogu lako pristupiti informacijama o izvođačima. Također, integrira se s vanjskom uslugom za vremensku prognozu, što omogućava korisnicima da budu informirani o vremenskim uvjetima na dan događaja.

Registriranim korisnicima prikaz se prilagođava ovisno o njihovim preferencijama, temeljenim na "lajkovima" i "dislajkovima". Obavijesti se šalju putem emaila i unutar aplikacije, a korisnici su obaviješteni o novim oglasima koji odgovaraju njihovim interesima. Također, mogu pregledati svoje prošle transakcije, a sustav automatski popunjava podatke o transakciji na temelju detektirane interakcije.

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

