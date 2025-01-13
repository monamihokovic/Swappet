package Swappet.repository;

import Swappet.model.Korisnik;
import Swappet.model.Oglas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OglasRepository extends JpaRepository<Oglas, Integer> {
    //List<Oglas> findOglasByTipOglasIn(@Param("categories") List<Integer> categories); - stara verzija

    Oglas findByIdOglas(Integer id);

    Oglas findByKorisnik(Korisnik korisnik);

    // nova verzija - šalje upit za spajanje Oglasa i Ulaznice za dobivanje podataka o idoglas i cijena
    @Query("SELECT DISTINCT o, u.cijena FROM Oglas o LEFT JOIN Ulaznica u ON o.idOglas = u.oglas.idOglas " +
            "LEFT JOIN JeTip j on j.idOglas = o.idOglas WHERE j.idDog IN :categories AND o.aktivan > 0")
    List<Object[]> findOglasWithCijenaByCategories(@Param("categories") List<Integer> categories);

    //šalje upit za oglase i njihove cijene na temelju emaila
    @Query("SELECT DISTINCT o, u.cijena FROM Oglas o LEFT JOIN Ulaznica u ON o.idOglas = u.oglas.idOglas WHERE o.korisnik = :korisnik")
    List<Object[]> findOglasWithCijenaByEmail(Korisnik korisnik);

    //vraća oglase za razmjenu od korisnika
    @Query("SELECT DISTINCT o FROM Oglas o WHERE o.tipOglas = 1 AND o.korisnik = :korisnik AND o.aktivan > 0")
    List<Oglas> findTradesForUser(Korisnik korisnik);

    //vraća sve oglase s cijenama, za admina
    @Query("SELECT DISTINCT o, u.cijena FROM Oglas o LEFT JOIN Ulaznica u ON o.idOglas = u.oglas.idOglas")
    List<Object[]> findAllOglasi();
}