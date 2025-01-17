package Swappet.repository;

import Swappet.model.Ulaznica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UlaznicaRepository extends JpaRepository<Ulaznica, Integer> {

    @Query("SELECT u FROM Ulaznica u WHERE u.oglas.idOglas = :idOglas AND u.vrstaUlaznice > 0")
    List<Ulaznica> findUlazniceByOglas(@Param("idOglas") Integer idOglas);

    @Query("SELECT u FROM Ulaznica u WHERE u.oglas.idOglas = :idoglas")
    List<Ulaznica> findALlUlaznica(@Param("idoglas") Integer idoglas);

}