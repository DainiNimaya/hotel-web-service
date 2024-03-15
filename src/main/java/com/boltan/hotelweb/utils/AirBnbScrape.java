package com.boltan.hotelweb.utils;

import com.boltan.hotelweb.dto.HotelDTO;
import com.boltan.hotelweb.dto.request.HotelReqDTO;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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
            String hotels = document.select("script#data-deferred-state-0").html();
            JSONObject jsonObject = new JSONObject(hotels);

            JSONArray niobeMinimalClientDataArray = jsonObject.getJSONArray("niobeMinimalClientData");

            JSONArray firstElementArray = niobeMinimalClientDataArray.getJSONArray(0);
            JSONObject nestedJsonObject = firstElementArray.getJSONObject(1);
            JSONObject dataObject = nestedJsonObject.getJSONObject("data");
            JSONObject presentationObject = dataObject.getJSONObject("presentation");
            JSONObject staysSearchObject = presentationObject.getJSONObject("staysSearch");
            JSONObject resultsObject = staysSearchObject.getJSONObject("results");
            JSONArray searchResultsArray = resultsObject.getJSONArray("searchResults");


            for (Object object : searchResultsArray) {

                JSONObject jsonDataObj = (JSONObject) object;

                JSONObject result = jsonDataObj.getJSONObject("listing");
                String price = "";

                Object pictureArray = result.getJSONArray("contextualPictures");

                JSONObject picObject = ((JSONArray) pictureArray).getJSONObject(0);
                JSONObject pricingQuoteObj = (JSONObject) object;
                JSONObject pricingQuote = pricingQuoteObj.getJSONObject("pricingQuote");
                JSONObject priceObj = pricingQuote.getJSONObject("structuredStayDisplayPrice");
                JSONObject pricePrimaryLine = priceObj.getJSONObject("primaryLine");

                price = pricePrimaryLine.has("price") ? pricePrimaryLine.getString("price") : pricePrimaryLine.getString("discountedPrice");

                HotelDTO hotelDTO = new HotelDTO(result.getString("title"),dto.getLocation(),price,picObject.getString("picture"),result.getString("name"));
                hotelList.add(hotelDTO);
            }

            return hotelList;
        }catch(IOException e) {
            e.printStackTrace();
        }

        return null;

    }

}
