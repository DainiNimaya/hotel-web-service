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
public class AirBnbScrape {

    public List<HotelDTO> getDetails(HotelReqDTO dto){

        String url = "https://www.airbnb.com/s/Sri-Lanka/homes?query="+dto.getLocation()+"&checkin="+dto.getCheckIn()+"&checkout="+dto.getCheckOut()+"&adults="+dto.getAdultCount()+"&children="+dto.getChildCount();

        try{
            List<HotelDTO> hotelList = new ArrayList<>();
            Document document = Jsoup.connect(url).get();
            Elements hotels = document.select(".dir-ltr");
            for(Element hotel: hotels){
                String name = hotel.select(".dir-ltr > div > div > div > div > div > div > .lxq01kf atm_9s_1txwivl atm_am_kyuy1d atm_ar_d67k9l l1tup9az atm_1p4glcj_1bp4okc dir dir-ltr > div #title_23025533").text();
//                String imgUrl = hotel.select(".c066246e13 > div > div > a > img").attr("src");
//                String location = dto.getLocation();
//
//                String price = hotel.select(".c066246e13 > div > div > div > div > div > div > span > div > div > span ").text();
//                if (price.isEmpty()) price = hotel.select(".c066246e13 > div > div > div > div > div > div > span ").text();
//
//                String roomName = hotel.select(".c066246e13 > div > div > div > div > div > div > div > h4 ").text();
                System.out.println(name);
                HotelDTO hotelDTO = new HotelDTO(name,"","","","");
                hotelList.add(hotelDTO);
            }

            return hotelList;
        }catch(IOException e) {
            e.printStackTrace();
        }

        return null;

    }

}
