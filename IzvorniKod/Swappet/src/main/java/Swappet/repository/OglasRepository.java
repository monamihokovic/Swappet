package Swappet.repository;

import Swappet.model.Oglas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OglasRepository extends JpaRepository<Oglas, Integer> {
    List<Oglas> findOglasByTipOglasIn(@Param("categories") List<Integer> categories);
}
