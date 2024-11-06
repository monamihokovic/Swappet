package PROGI.Swappet.repository;

import PROGI.Swappet.model.SeMijenja;
import PROGI.Swappet.model.SeMijenjaId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeMijenjaRepository extends JpaRepository<SeMijenja, SeMijenjaId> {
}
