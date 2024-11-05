package Swappet.repository;

import Swappet.model.JeTip;
import Swappet.model.JeTipId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JeTipRepository extends JpaRepository<JeTip, JeTipId> {
}