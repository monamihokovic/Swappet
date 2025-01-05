package Swappet.repository;

import Swappet.model.Transakcija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransakcijaRepository extends JpaRepository<Transakcija, Integer> {

    //List<Transakcija> findByEmail(String email);

}
