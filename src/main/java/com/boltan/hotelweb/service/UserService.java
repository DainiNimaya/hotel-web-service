package com.boltan.hotelweb.service;

import com.boltan.hotelweb.dto.UserDTO;
import com.boltan.hotelweb.dto.request.CreateUserReqDTO;
import com.boltan.hotelweb.dto.request.LoginReqDTO;
import com.boltan.hotelweb.dto.response.TokenResponseDTO;
import com.boltan.hotelweb.entity.UserEntity;

public interface UserService {
    UserDTO createUser(CreateUserReqDTO dto);

    TokenResponseDTO requestToken(LoginReqDTO dto);
}
