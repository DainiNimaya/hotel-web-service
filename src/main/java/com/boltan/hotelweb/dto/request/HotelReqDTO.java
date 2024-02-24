package com.boltan.hotelweb.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HotelReqDTO {

    private String username;
    private String name;
    private String location;
    private String checkIn;
    private String checkOut;
    private String adultCount;
    private String childCount;
    private String roomCount;
    private String age;


}
