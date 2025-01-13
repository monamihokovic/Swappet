package Swappet.repository;

import Swappet.model.JeUkljucen;
import Swappet.model.JeUkljucenId;
import Swappet.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JeUkljucenRepository extends JpaRepository<JeUkljucen, JeUkljucenId> {

    JeUkljucen findByIdTransakcija(Integer idTransakcija);

    List<JeUkljucen> findByEmail(String email);

}


