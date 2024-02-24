package com.boltan.hotelweb.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SearchHistoryDTO {

    private long id;
    private String searchLocation;
    private String searchCheckIns;
    private String searchAdultCount;
    private String searchChildCount;
    private String searchRoomCount;
    private Date searchDate;
    private String searchSite;

    public SearchHistoryDTO(long id, String searchLocation, Date searchDate, String searchCheckIns, String searchRoomCount, String searchAdultCount, String searchChildCount, String searchSite) {
        this.id = id;
        this.searchLocation = searchLocation;
        this.searchCheckIns = searchCheckIns;
        this.searchAdultCount = searchAdultCount;
        this.searchChildCount = searchChildCount;
        this.searchRoomCount = searchRoomCount;
        this.searchDate = searchDate;
        this.searchSite = searchSite;
    }
}
