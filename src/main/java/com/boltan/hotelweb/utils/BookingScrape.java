package com.boltan.hotelweb.utils;

import com.boltan.hotelweb.dto.HotelDTO;
import com.boltan.hotelweb.dto.request.HotelReqDTO;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class BookingScrape {

    public List<HotelDTO> getDetails(HotelReqDTO dto){

        String url = "https://www.booking.com/searchresults.en-gb.html?ss="+dto.getLocation()+"&checkin="+dto.getCheckIn()+"&checkout="+dto.getCheckOut()+"&no_rooms="+dto.getRoomCount()+"&group_adults="+dto.getAdultCount()+"&group_children="+dto.getChildCount()+"&age="+dto.getAge();

        try{
            List<HotelDTO> hotelList = new ArrayList<>();
            Document document = Jsoup.connect(url).get();
            Elements hotels = document.select(".c066246e13");
            for(Element hotel: hotels){

                String name = hotel.select(".c066246e13 > div > div > div > div > div > div > div > div > h3 > a > div ").text();
                String imgUrl = hotel.select(".c066246e13 > div > div > a > img").attr("src");
                String location = dto.getLocation();

                String price = hotel.select(".c066246e13 > div > div > div > div > div > div > span > div > div > span ").text();
                if (price.isEmpty()) price = hotel.select(".c066246e13 > div > div > div > div > div > div > span ").text();

                String roomName = hotel.select(".c066246e13 > div > div > div > div > div > div > div > h4 ").text();
                HotelDTO hotelDTO = new HotelDTO(name,location,price,imgUrl,roomName);
                hotelList.add(hotelDTO);
            }

            return hotelList;
        }catch(IOException e) {
            e.printStackTrace();
        }

        return null;

    }

}
