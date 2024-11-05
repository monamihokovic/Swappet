package Swappet.repository;

import Swappet.model.VoliTip;
import Swappet.model.VoliTipId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoliTipRepository extends JpaRepository<VoliTip, VoliTipId> {
}