package com.boltan.hotelweb.service.impl;

import com.boltan.hotelweb.dto.HotelDTO;
import com.boltan.hotelweb.dto.SearchHistoryDTO;
import com.boltan.hotelweb.dto.request.HotelReqDTO;
import com.boltan.hotelweb.service.HotelService;
import com.boltan.hotelweb.service.SearchHistoryService;
import com.boltan.hotelweb.utils.AirBnbScrape;
import com.boltan.hotelweb.utils.BookingScrape;
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
    private final SearchHistoryService searchHistoryService;

    @Override
    public List<HotelDTO> getHotelDetails(HotelReqDTO dto,String type) {
        try{
            List<HotelDTO> hotelList =  new ArrayList<>();
            SearchHistoryDTO searchDto = searchHistoryService.createSearchHistory(dto,type);
            hotelList = type == "BOOKING" ? bookingScrape.getDetails(dto) : airBnbScrape.getDetails(dto);
            return hotelList;
        }catch (Exception e){
            log.error("Function createUser : ", e);
            throw e;
        }
    }
}
