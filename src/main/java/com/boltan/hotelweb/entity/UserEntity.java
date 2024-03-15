package com.boltan.hotelweb.entity;

import com.boltan.hotelweb.enums.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
@ToString

public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 255)
    private String firstName;

    @Column(length = 255)
    private String lastName;

    @Column(length = 255, unique = true, nullable = false)
    private String username;

    @Column(length = 255, nullable = false)
    private String email;

    @Column(length = 255)
    private String mobileNumber;

    @Column(length = 255, nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role userRole;

    @Column
    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date joinedDate;

    @Column(length = 255)
    private String status;

}
