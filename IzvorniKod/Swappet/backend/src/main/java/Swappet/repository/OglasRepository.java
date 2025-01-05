package Swappet.repository;

import Swappet.model.Oglas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OglasRepository extends JpaRepository<Oglas, Integer> {
    //List<Oglas> findOglasByTipOglasIn(@Param("categories") List<Integer> categories); - stara verzija

    // nova verzija - šalje upit za spajanje Oglasa i Ulaznice za dobivanje podataka o idoglas i cijena
    @Query("SELECT DISTINCT o, u.cijena FROM Oglas o LEFT JOIN Ulaznica u ON o.idOglas = u.oglas.idOglas WHERE o.tipOglas IN :categories")
    List<Object[]> findOglasWithCijenaByCategories(@Param("categories") List<Integer> categories);

    
    //List<Oglas> findOglasByEmail(String email);
}