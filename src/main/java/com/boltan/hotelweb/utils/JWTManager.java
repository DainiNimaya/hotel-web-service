package com.boltan.hotelweb.utils;

import com.boltan.hotelweb.constant.Constant;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Calendar;
import java.util.Date;

@Component
public class JWTManager {

    public String signJWS(String username, String password)  {
        Date issued = new Date();
        Date expiration;
        Calendar c = Calendar.getInstance();
        c.setTime(issued);
        c.add(Calendar.DATE, 30);
        expiration = c.getTime();

        SecretKey secretKey = Keys.hmacShaKeyFor((password + Constant.SECRET).getBytes());

        return Jwts.builder()
                .setIssuer("bolton")
                .setSubject(username)
                .setIssuedAt(issued)
                .setExpiration(expiration)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> verifyJWS(String jws, String password) {
        SecretKey secretKey = Keys.hmacShaKeyFor((password + Constant.SECRET).getBytes());

        try {
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jws);
        } catch (JwtException e) {
            return null;
        }
    }
}
