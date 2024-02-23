package com.boltan.hotelweb.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginReqDTO {

    private String username;
    private String password;
}
