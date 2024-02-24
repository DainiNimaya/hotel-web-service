package com.boltan.hotelweb.service;

import com.boltan.hotelweb.dto.UserDTO;
import com.boltan.hotelweb.dto.request.CreateUserReqDTO;
import com.boltan.hotelweb.dto.request.LoginReqDTO;
import com.boltan.hotelweb.dto.response.TokenResponseDTO;
import com.boltan.hotelweb.entity.UserEntity;

import java.util.List;

public interface UserService {
    UserDTO createUser(CreateUserReqDTO dto);

    TokenResponseDTO requestToken(LoginReqDTO dto);

    UserDTO getUser(String username);

    CreateUserReqDTO updateUser(CreateUserReqDTO dto);

    List<UserDTO> getAllUsers();
}
