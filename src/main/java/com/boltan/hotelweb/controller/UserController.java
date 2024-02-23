package com.boltan.hotelweb.controller;

import com.boltan.hotelweb.dto.UserDTO;
import com.boltan.hotelweb.dto.request.CreateUserReqDTO;
import com.boltan.hotelweb.dto.response.CommonResponseDTO;
import com.boltan.hotelweb.entity.UserEntity;
import com.boltan.hotelweb.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
@Log4j2
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public void createUserAccount(){
        System.out.println("hello");
    }

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE} )
    public ResponseEntity<CommonResponseDTO> createUserAccount(@RequestBody CreateUserReqDTO dto){
        log.info("Start function loadUserByUsername : {}");
        UserDTO user = userService.createUser(dto);
        return new ResponseEntity<>(new CommonResponseDTO(true, "The user account has been successfully created.",user ),
                HttpStatus.OK);
    }

}
