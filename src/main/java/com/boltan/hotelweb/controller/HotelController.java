package com.boltan.hotelweb.controller;


import com.boltan.hotelweb.dto.request.HotelReqDTO;
import com.boltan.hotelweb.dto.response.CommonResponseDTO;
import com.boltan.hotelweb.service.HotelService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/hotel")
@CrossOrigin
@Log4j2
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @PostMapping(value = "/{type}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CommonResponseDTO> getUserDetailsBooking(@PathVariable("type") String  type, @RequestBody HotelReqDTO dto){
        return new ResponseEntity<>(new CommonResponseDTO(true, "Get hotel details from booking.com", hotelService.getHotelDetails(dto,type)),
                HttpStatus.OK);
    }
}