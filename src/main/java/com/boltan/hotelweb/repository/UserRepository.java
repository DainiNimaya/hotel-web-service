package com.boltan.hotelweb.repository;

import com.boltan.hotelweb.dto.UserDTO;
import com.boltan.hotelweb.entity.UserEntity;

import java.util.List;

import com.boltan.hotelweb.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUsername(String username);

    @Query(value = "SELECT new com.boltan.hotelweb.dto.UserDTO(ss.id, ss.username, ss.firstName, ss.lastName, ss.email, ss.mobileNumber, ss.userRole, ss.joinedDate, ss.status) " +
            "FROM UserEntity ss WHERE ss.userRole =:role")
    List<UserDTO> getAllUsers(Role role);

//    @Query(value = "UPDATE user SET password =:password WHERE ss.username =:username")
//    List<UserDTO> changePassword(String username, String password);

}
