package Swappet.repository;

import Swappet.model.JeUkljucen;
import Swappet.model.JeUkljucenId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JeUkljucenRepository extends JpaRepository<JeUkljucen, JeUkljucenId> {

    JeUkljucen findByIdTransakcija(Integer idTransakcija);
}
