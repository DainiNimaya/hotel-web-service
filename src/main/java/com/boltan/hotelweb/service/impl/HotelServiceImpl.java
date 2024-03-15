package com.boltan.hotelweb.service.impl;

import com.boltan.hotelweb.dto.HotelDTO;
import com.boltan.hotelweb.dto.SearchHistoryDTO;
import com.boltan.hotelweb.dto.request.HotelReqDTO;
import com.boltan.hotelweb.entity.UserEntity;
import com.boltan.hotelweb.enums.Role;
import com.boltan.hotelweb.exception.CustomException;
import com.boltan.hotelweb.repository.UserRepository;
import com.boltan.hotelweb.service.HotelService;
import com.boltan.hotelweb.service.SearchHistoryService;
import com.boltan.hotelweb.utils.AirBnbScrape;
import com.boltan.hotelweb.utils.BookingScrape;
import com.boltan.hotelweb.utils.HotelsScrape;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class HotelServiceImpl implements HotelService {

    private final BookingScrape bookingScrape;
    private final AirBnbScrape airBnbScrape;
    private final HotelsScrape hotelsScrape;
    private final SearchHistoryService searchHistoryService;
    private final UserRepository userRepository;

    @Override
    public List<HotelDTO> getHotelDetails(HotelReqDTO dto,String type) {
        try{

            log.info("Execute method getHotelDetails");

            UserEntity user = userRepository.findByUsername(dto.getUsername());
            if(user == null) throw new CustomException(false, "User not found");

            if(user.getStatus().equalsIgnoreCase("INACTIVE")) throw new CustomException(false, "User is not active");

            List<HotelDTO> hotelList =  new ArrayList<>();
            SearchHistoryDTO searchDto = searchHistoryService.createSearchHistory(dto,type);
            switch (type){
                case "BOOKING":
                    hotelList = bookingScrape.getDetails(dto);
                    break;
                case "HOTELS":
                    hotelList = hotelsScrape.getDetails(dto);
                    break;
                case "AIRBNB":
                    hotelList = airBnbScrape.getDetails(dto);
                    break;
            }
            return hotelList;
        }catch (Exception e){
            log.error("Function getHotelDetails : ", e);
            throw e;
        }
    }

    @Override
    public List<HotelDTO> shareHotelDetails(HotelReqDTO dto, String type) {
        try{

            log.info("Execute method shareHotelDetails");

            UserEntity user = userRepository.findByUsername(dto.getUsername());
            if(user == null) throw new CustomException(false, "User not found");

            if(!user.getUserRole().equals(Role.OTHER)) throw new CustomException(false, "User role is no valid");

            List<HotelDTO> hotelList =  getHotelDetails(dto, type);
            return hotelList;
        }catch (Exception e){
            log.error("Function getHotelDetails : ", e);
            throw e;
        }
    }
}
