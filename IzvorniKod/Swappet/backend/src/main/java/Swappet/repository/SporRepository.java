package Swappet.repository;

import Swappet.model.Korisnik;
import Swappet.model.Spor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SporRepository extends JpaRepository<Spor, Integer> {

    //vraća sporove u kojima je prijavljeni korisnik koji još nisu obrađeni
    @Query("SELECT s FROM Spor s WHERE s.tuzen = :korisnik AND s.odlukaSpor = 0")
    Spor findByTuzen(Korisnik korisnik);

    //vraća sve neobrađene sporove
    @Query("SELECT t.tuzen FROM Spor t WHERE t.odlukaSpor = 0")
    List<Korisnik> blame();
}
