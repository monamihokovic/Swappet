package Swappet.repository;

import Swappet.model.SeMijenja;
import Swappet.model.SeMijenjaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeMijenjaRepository extends JpaRepository<SeMijenja, SeMijenjaId> {

    SeMijenja findByIdUlaznica(Integer idUlaznica);

}