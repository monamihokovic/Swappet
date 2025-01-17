package Swappet.repository;

import Swappet.model.Korisnik;
import Swappet.model.Spor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SporRepository extends JpaRepository<Spor, Integer> {

    Spor findByTuzen(Korisnik korisniks);

    List<Spor> findByTuzenEmail(String tuzeniEmail);
}
