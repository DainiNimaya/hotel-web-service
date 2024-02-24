package com.boltan.hotelweb.service.impl;

import com.boltan.hotelweb.dto.HotelDTO;
import com.boltan.hotelweb.dto.SearchHistoryDTO;
import com.boltan.hotelweb.dto.request.HotelReqDTO;
import com.boltan.hotelweb.entity.SearchHistoryEntity;
import com.boltan.hotelweb.entity.UserEntity;
import com.boltan.hotelweb.exception.CustomException;
import com.boltan.hotelweb.repository.SearchHistoryRepository;
import com.boltan.hotelweb.repository.UserRepository;
import com.boltan.hotelweb.service.HotelService;
import com.boltan.hotelweb.service.SearchHistoryService;
import com.boltan.hotelweb.utils.BookingScrape;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

import static com.google.common.hash.Hashing.sha256;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class SearchHistoryServiceImpl implements SearchHistoryService {


    private final ModelMapper modelMapper;
    private final SearchHistoryRepository searchHistoryRepository;
    private final UserRepository userRepository;

    @Override
    public SearchHistoryDTO createSearchHistory(HotelReqDTO dto, String type) {
        try{
            log.info("Execute method createSearchHistory");

            UserEntity user = userRepository.findByUsername(dto.getUsername());
            if (user == null) throw new CustomException(false,"Unauthorized user");

            SearchHistoryEntity searchHistoryEntity = new SearchHistoryEntity();
            searchHistoryEntity.setSearchUser(dto.getUsername());
            searchHistoryEntity.setSearchAdultCount(dto.getAdultCount());
            searchHistoryEntity.setSearchChildCount(dto.getChildCount());
            searchHistoryEntity.setSearchRoomCount(dto.getRoomCount());
            searchHistoryEntity.setSearchCheckIns(dto.getCheckIn()+" "+dto.getCheckOut());
            searchHistoryEntity.setSearchDate(new Date());
            searchHistoryEntity.setSearchLocation(dto.getLocation());
            searchHistoryEntity.setSearchSite(type);

            searchHistoryRepository.save(searchHistoryEntity);

            SearchHistoryDTO historyDTO = modelMapper.map(searchHistoryEntity, SearchHistoryDTO.class);

            return historyDTO;
        }catch (Exception e){
            log.error("Function createSearchHistory : ", e);
            throw e;
        }
    }

    @Override
    public List<SearchHistoryDTO> getAllSearchByUser(String username) {
        return null;
    }
}
