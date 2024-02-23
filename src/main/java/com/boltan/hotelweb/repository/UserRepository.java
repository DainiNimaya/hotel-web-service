package com.boltan.hotelweb.repository;

import com.boltan.hotelweb.entity.UserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUsername(String username);



}
