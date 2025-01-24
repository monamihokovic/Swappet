package Swappet.repository;

import Swappet.model.Korisnik;
import Swappet.model.Ulaznica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UlaznicaRepository extends JpaRepository<Ulaznica, Integer> {

    //vraća sve ulaznice za jedan oglas
    @Query("SELECT u FROM Ulaznica u WHERE u.oglas.idOglas = :idOglas AND u.vrstaUlaznice > 0")
    List<Ulaznica> findUlazniceByOglas(@Param("idOglas") Integer idOglas);

    //vraća listu transakcija u kojima su ulaznice koje treba potvrditi u razmjeni, za zadani oglas
    @Query(value = "SELECT idtransakcija FROM semijenja NATURAL JOIN jeukljucen " +
            "NATURAL JOIN ulaznica WHERE odluka = 0 AND idoglas = :idoglas", nativeQuery = true)
    List<Integer> ulaznice(@Param("idoglas") Integer idoglas);

    //vraća sve ulaznice za zadani oglas
    @Query("SELECT u FROM Ulaznica u WHERE u.oglas.idOglas = :idoglas")
    List<Ulaznica> findALlUlaznica(@Param("idoglas") Integer idoglas);

    //vraća sve ulaznice nekog korisnika
    @Query("SELECT u FROM Ulaznica u WHERE u.oglas.korisnik = :korisnik")
    List<Ulaznica> findUserUlaznice(@Param("korisnik") Korisnik korisnik);

}