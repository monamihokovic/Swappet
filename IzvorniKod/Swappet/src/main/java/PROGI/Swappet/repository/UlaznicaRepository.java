package PROGI.Swappet.repository;

import PROGI.Swappet.model.Ulaznica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UlaznicaRepository extends JpaRepository<Ulaznica, Integer> {
}
