package PROGI.Swappet.repository;

import PROGI.Swappet.model.VoliOglas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoliOglasRepository extends JpaRepository<VoliOglas, String> {
}
