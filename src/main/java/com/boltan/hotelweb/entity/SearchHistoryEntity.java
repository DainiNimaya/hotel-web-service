package com.boltan.hotelweb.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "searchHistory")
@ToString

public class SearchHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 255)
    private String searchUser;

    @Column(length = 255)
    private String searchLocation;

    @Column(length = 255)
    private Date searchDate;

    @Column(length = 255)
    private String searchCheckIns;

    @Column(length = 255)
    private String searchRoomCount;

    @Column(length = 255)
    private String searchAdultCount;

    @Column(length = 255)
    private String searchChildCount;

    @Column(length = 255)
    private String searchSite;


}
