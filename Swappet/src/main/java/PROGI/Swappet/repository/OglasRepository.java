package PROGI.Swappet.repository;

import PROGI.Swappet.model.Oglas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OglasRepository extends JpaRepository<Oglas, Integer> {
}
