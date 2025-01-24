package Swappet.repository;

import Swappet.model.JeUkljucen;
import Swappet.model.JeUkljucenId;
import Swappet.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JeUkljucenRepository extends JpaRepository<JeUkljucen, JeUkljucenId> {

    @Query("SELECT ju FROM JeUkljucen ju WHERE ju.idTransakcija = :idtransakcija AND ju.odluka = 0 AND ju.email = :email")
    JeUkljucen findByIdTransakcija(@Param("idtransakcija") Integer idTransakcija, @Param("email") String email);

    List<JeUkljucen> findByEmail(String email);

}


