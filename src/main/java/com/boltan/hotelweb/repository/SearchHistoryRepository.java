package com.boltan.hotelweb.repository;

import com.boltan.hotelweb.dto.SearchHistoryDTO;
import com.boltan.hotelweb.dto.UserDTO;
import com.boltan.hotelweb.entity.SearchHistoryEntity;
import com.boltan.hotelweb.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistoryEntity, Long> {

    @Query(value = "SELECT new com.boltan.hotelweb.dto.SearchHistoryDTO(ss.id, ss.searchLocation, ss.searchDate, ss.searchCheckIns, ss.searchRoomCount, ss.searchAdultCount, ss.searchChildCount, ss.searchSite) " +
            "FROM SearchHistoryEntity ss WHERE ss.searchUser =:username")
    List<SearchHistoryDTO> getUserSearchHistory(String username);

}
