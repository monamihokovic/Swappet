package Swappet.repository;

import Swappet.model.DeaktiviranOglas;
import Swappet.model.DeaktiviranOglasId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeaktiviranOglasRepository extends JpaRepository<DeaktiviranOglas, DeaktiviranOglasId> {

    @Query("SELECT do FROM DeaktiviranOglas do WHERE do.idoglas = :idoglas")
    DeaktiviranOglas findByIdoglas(@Param("idoglas") Integer idoglas);

}
