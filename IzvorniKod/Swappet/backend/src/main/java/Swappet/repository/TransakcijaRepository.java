package Swappet.repository;

import Swappet.model.Transakcija;
import Swappet.model.Ulaznica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransakcijaRepository extends JpaRepository<Transakcija, Integer> {

    Transakcija findByIdTransakcija(int id);

    Transakcija findByUlaznica(Ulaznica ulaznica);

    @Query("SELECT t FROM Transakcija t WHERE t.dvPocetak >= CURRENT_DATE - 1 MONTH ")
    List<Transakcija> reportTransactions();

    @Query(value = "SELECT ju.odluka, t.idulaznica, sm.idulaznica, o.idoglas " +
            "FROM transakcija t " +
            "JOIN jeUkljucen ju ON t.idtransakcija = ju.idtransakcija " +
            "JOIN seMijenja sm ON t.idtransakcija = sm.idtransakcija " +
            "JOIN ulaznica u ON t.idulaznica = u.idulaznica " +
            "JOIN oglas o ON u.idoglas = o.idoglas " +
            "WHERE ju.odluka = 0 AND o.email = :email",
            nativeQuery = true)
    List<Object[]> findUserTrades(@Param("email") String email);
}