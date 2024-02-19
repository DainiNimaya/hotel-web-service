package com.boltan.hotelweb.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomException extends RuntimeException{
    private int status;
    private String message;

    public CustomException(int status,String message) {
        super(message);
        this.status = status;
        this.message = message;
    }


}
