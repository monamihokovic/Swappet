package Swappet.repository;

import Swappet.model.Transakcija;
import Swappet.model.Ulaznica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransakcijaRepository extends JpaRepository<Transakcija, Integer> {

    Transakcija findByIdTransakcija(int id);

    Transakcija findByUlaznica(Ulaznica ulaznica);

    @Query("SELECT t FROM Transakcija t WHERE t.dvPocetak >= CURRENT_DATE - 1 MONTH ")
    List<Transakcija> reportTransactions();
}
