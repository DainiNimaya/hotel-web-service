package com.boltan.hotelweb.controller;

import com.boltan.hotelweb.dto.request.CreateUserReqDTO;
import com.boltan.hotelweb.dto.request.LoginReqDTO;
import com.boltan.hotelweb.dto.response.CommonResponseDTO;
import com.boltan.hotelweb.dto.response.TokenResponseDTO;
import com.boltan.hotelweb.entity.UserEntity;
import com.boltan.hotelweb.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/token")
@CrossOrigin
@Log4j2
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<CommonResponseDTO> requestToken(@RequestBody LoginReqDTO dto){
        log.info("Start function loadUserByUsername : {}");
        TokenResponseDTO requestToken = userService.requestToken(dto);
        return new ResponseEntity<>(new CommonResponseDTO(true, "The login verification successful.",requestToken ),
                HttpStatus.OK);
    }

}
