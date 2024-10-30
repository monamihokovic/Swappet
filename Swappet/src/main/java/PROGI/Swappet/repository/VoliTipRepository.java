package PROGI.Swappet.repository;

import PROGI.Swappet.model.VoliTip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoliTipRepository extends JpaRepository<VoliTip, String> {
}
