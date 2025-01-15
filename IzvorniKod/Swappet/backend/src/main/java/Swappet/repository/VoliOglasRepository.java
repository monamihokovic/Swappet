package Swappet.repository;

import Swappet.model.VoliOglas;
import Swappet.model.VoliOglasId;
import aj.org.objectweb.asm.commons.Remapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoliOglasRepository extends JpaRepository<VoliOglas, VoliOglasId> {
    Optional<VoliOglas> findByEmailAndIdOglas(String email, Integer idOglas);
}
