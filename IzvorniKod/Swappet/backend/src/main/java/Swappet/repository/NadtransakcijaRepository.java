package Swappet.repository;

import Swappet.model.Nadtransakcija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface NadtransakcijaRepository extends JpaRepository<Nadtransakcija, Integer> {

}