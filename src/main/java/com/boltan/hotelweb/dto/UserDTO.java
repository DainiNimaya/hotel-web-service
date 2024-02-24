package com.boltan.hotelweb.dto;

import com.boltan.hotelweb.enums.Role;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String username;
    private String password;
    private Role userRole;

    public UserDTO(long id, String firstName, String lastName, String email, String mobileNumber, Role userRole) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.userRole = userRole;
    }
}
