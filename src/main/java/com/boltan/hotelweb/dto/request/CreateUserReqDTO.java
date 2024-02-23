package com.boltan.hotelweb.dto.request;

import com.boltan.hotelweb.enums.Role;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateUserReqDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String username;
    private String password;
    private Role userRole;

}
