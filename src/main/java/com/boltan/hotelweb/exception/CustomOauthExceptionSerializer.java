package com.boltan.hotelweb.exception;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class CustomOauthExceptionSerializer extends StdSerializer<CustomOauthException> {
    public CustomOauthExceptionSerializer() { super(com.boltan.hotelweb.exception.CustomOauthException.class);
    }

    @Override
    public void serialize(com.boltan.hotelweb.exception.CustomOauthException value, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeBooleanField("success", false);
        jsonGenerator.writeObjectField("message", value.getMessage());
        jsonGenerator.writeEndObject();
    }
}
