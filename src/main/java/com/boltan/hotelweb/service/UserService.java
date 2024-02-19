package com.boltan.hotelweb.service;

import com.boltan.hotelweb.dto.UserDTO;

public interface UserService {
    UserDTO getUserDetailsByUserEmail(String userEmail);
}
