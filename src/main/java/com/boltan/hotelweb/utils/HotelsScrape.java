package com.boltan.hotelweb.utils;

import com.boltan.hotelweb.dto.HotelDTO;
import com.boltan.hotelweb.dto.request.HotelReqDTO;
import com.boltan.hotelweb.webScraper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class HotelsScrape {

    private final webScraper test = new webScraper();

    public List<HotelDTO> getDetails(HotelReqDTO dto){

        String url = "https://www.hotels.com/Hotel-Search?ss="+dto.getLocation()+"&checkin="+dto.getCheckIn()+"&checkout="+dto.getCheckOut()+"&no_rooms="+dto.getRoomCount()+"&group_adults="+dto.getAdultCount()+"&group_children="+dto.getChildCount()+"&age="+dto.getAge();

//        List<HotelDTO> hotelList = test.getHotels(dto.getLocation());
        List<HotelDTO> hotelList = new ArrayList<>();
        try{
            Document document = Jsoup.connect(url).get();

            Elements hotelsList = document.select(".uitk-spacing uitk-spacing-margin-block-three");
            for(Element hotel: hotelsList){

                String name = hotel.select(".uitk-spacing uitk-spacing-margin-block-three > div > div > div > div > div > div > div > div > h3 > a > .f6431b446c ").text();
                String imgUrl = hotel.select(".uitk-spacing uitk-spacing-margin-block-three > div > div > a > img").attr("src");
                String location = dto.getLocation();

                String price = hotel.select(".uitk-spacing uitk-spacing-margin-block-three > div > div > div > div > div > div > span > div > div > span ").text();
                if (price.isEmpty()) price = hotel.select(".uitk-spacing uitk-spacing-margin-block-three > div > div > div > div > div > div > span ").text();

                String roomName = hotel.select("..uitk-spacing uitk-spacing-margin-block-three > div > div > div > div > div > div > div > h4 ").text();
                HotelDTO hotelDTO = new HotelDTO(name,location,price,imgUrl,roomName);
                hotelList.add(hotelDTO);
            }

            return hotelList;
        }catch(IOException e) {
            e.printStackTrace();
        }

        return hotelList;

    }

}