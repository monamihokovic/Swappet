package Swappet.repository;

import Swappet.model.JeTip;
import Swappet.model.JeTipId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface JeTipRepository extends JpaRepository<JeTip, JeTipId> {
	@Query("SELECT jt FROM JeTip jt WHERE jt.idOglas = :idOglas")
	JeTip findByIdOglas(@Param("idOglas") Integer idOglas);
}