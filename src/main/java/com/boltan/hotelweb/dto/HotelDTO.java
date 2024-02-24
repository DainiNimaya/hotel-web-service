package com.boltan.hotelweb.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HotelDTO {

    private String name;
    private String location;
    private String price;
    private String imgUrl;
    private String roomName;

}
