package com.boltan.hotelweb.repository;

import com.boltan.hotelweb.dto.UserDTO;
import com.boltan.hotelweb.entity.UserEntity;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUsername(String username);

    @Query(value = "SELECT new com.boltan.hotelweb.dto.UserDTO(ss.id, ss.firstName, ss.lastName, ss.mobileNumber, ss.email, ss.userRole) " +
            "FROM UserEntity ss ")
    List<UserDTO> getAllUsers();

}
