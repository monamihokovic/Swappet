package PROGI.Swappet.repository;

import PROGI.Swappet.model.JeUkljucen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JeUkljucenRepository extends JpaRepository<JeUkljucen, String> {
}
