package com.boltan.hotelweb.dto.request;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChangePswrdReqDTO {

    private String username;
    private String oldPassword;
    private String newPassword;
}
