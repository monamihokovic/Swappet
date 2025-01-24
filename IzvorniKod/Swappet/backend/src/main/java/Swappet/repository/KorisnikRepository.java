package Swappet.repository;

import Swappet.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik, String> {

    Korisnik findByEmail(String email);

    @Query("SELECT k FROM Korisnik k WHERE k.uloga = 1")
    List<Korisnik> findAdmins();

}
