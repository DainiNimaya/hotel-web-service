package com.boltan.hotelweb;

import com.boltan.hotelweb.dto.HotelDTO;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class webScraper {
//    public static void main(String[] args) {
//
//    }

    public List<HotelDTO> getHotels(String location){
        List<HotelDTO> hotelList = new ArrayList<>();

        if (location.equalsIgnoreCase("Colombo")) {
            hotelList.add(new HotelDTO("Courtyard By Marriott Colombo",location,"USD 120", "https://a.travel-assets.com/media/meso_cm/PAPI/Images/lodging/92000000/91020000/91017300/91017278/27237f49_b.jpg?impolicy=resizecrop&rw=455&ra=fit",""));
        } else if(location.equalsIgnoreCase("Kandy")) {
            hotelList.add(new HotelDTO("The Radha Hotel",location,"USD 89", "https://images.trvl-media.com/lodging/30000000/29930000/29922400/29922346/c13ceba5.jpg?impolicy=resizecrop&rw=598&ra=fit",""));
        } else if(location.equalsIgnoreCase("Galle")) {
            hotelList.add(new HotelDTO("Radisson Blu Resort Galle",location,"USD 195", "https://images.trvl-media.com/lodging/17000000/16270000/16267200/16267123/32441768.jpg?impolicy=resizecrop&rw=455&ra=fit",""));
        } else if(location.equalsIgnoreCase("Ampara")) {
            hotelList.add(new HotelDTO("Wild Glamping Gal Oya",location,"USD 311", "https://images.trvl-media.com/lodging/73000000/72310000/72300100/72300003/f0cfa977.jpg?impolicy=resizecrop&rw=598&ra=fit",""));
        } else if(location.equalsIgnoreCase("Anuradhapura")) {
            hotelList.add(new HotelDTO("Minneriya Lake Resort",location,"USD 57", "https://images.trvl-media.com/lodging/25000000/24900000/24891300/24891220/38daf661.jpg?impolicy=resizecrop&rw=598&ra=fit",""));
        } else if(location.equalsIgnoreCase("Badulla")) {
            hotelList.add(new HotelDTO("Mount View Hotel",location,"USD 22", "https://images.trvl-media.com/lodging/25000000/24450000/24441300/24441299/dd1b0fde.jpg?impolicy=resizecrop&rw=1200&ra=fit",""));
        } else if(location.equalsIgnoreCase("Baticaloa")) {
            hotelList.add(new HotelDTO("Courtyard By Marriott Colombo",location,"USD 120", "",""));
        } else if(location.equalsIgnoreCase("Gampaha")) {
            hotelList.add(new HotelDTO("Courtyard By Marriott Colombo",location,"USD 120", "",""));
        }

        return hotelList;
    }
}
