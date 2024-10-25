package com.swappet.Swappet.repository;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//JpaRepository<User, Integer> -> Integer je tip primarnog ključa. TODO: Promijeni to po onome kako je u bazi
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
