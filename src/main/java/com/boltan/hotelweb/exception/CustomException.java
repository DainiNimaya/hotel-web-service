package com.boltan.hotelweb.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomException extends RuntimeException{
    private boolean status;
    private String message;

    public CustomException(boolean status,String message) {
        super(message);
        this.status = status;
        this.message = message;
    }


}
