package Swappet.repository;

import Swappet.model.TipDog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipDogRepository extends JpaRepository<TipDog, Integer> {
}
