package com.boltan.hotelweb.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommonResponseDTO {
    private boolean success;
    private String msg;
    private Object object;

}
