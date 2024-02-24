package com.boltan.hotelweb.service;

import com.boltan.hotelweb.dto.HotelDTO;
import com.boltan.hotelweb.dto.request.HotelReqDTO;

import java.util.List;

public interface HotelService {

    List<HotelDTO> getHotelDetails(HotelReqDTO dto,String type);
}
