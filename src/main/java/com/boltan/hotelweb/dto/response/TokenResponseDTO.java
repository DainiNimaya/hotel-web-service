package com.boltan.hotelweb.dto.response;

import com.boltan.hotelweb.dto.UserDTO;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TokenResponseDTO {

    private String token;
    private UserDTO userDTO;
}
