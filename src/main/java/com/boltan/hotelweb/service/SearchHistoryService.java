package com.boltan.hotelweb.service;

import com.boltan.hotelweb.dto.SearchHistoryDTO;
import com.boltan.hotelweb.dto.UserDTO;
import com.boltan.hotelweb.dto.request.CreateUserReqDTO;
import com.boltan.hotelweb.dto.request.HotelReqDTO;
import com.boltan.hotelweb.dto.request.LoginReqDTO;
import com.boltan.hotelweb.dto.response.TokenResponseDTO;

import java.util.List;

public interface SearchHistoryService {

    SearchHistoryDTO createSearchHistory(HotelReqDTO dto, String type);

    List<SearchHistoryDTO> getAllSearchByUser(String username);
}
