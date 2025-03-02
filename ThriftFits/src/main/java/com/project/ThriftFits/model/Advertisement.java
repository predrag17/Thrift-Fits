package com.project.ThriftFits.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "ads")
public class Advertisement {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String clothingName;

    @NotBlank
    private String clothingType;

    @NotBlank
    private String clothingBrand;

    @NotBlank
    private String clothingSize;

    @NotBlank
    private String clothingColor;

    @NotBlank
    private String description;

    private LocalDateTime createdAt;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Image image;

    @ManyToOne
    @JsonIgnoreProperties("advertisements")
    private User user;


    public Advertisement(String clothingName, String clothingType, String clothingBrand, String clothingSize, String clothingColor, String description, LocalDateTime createdAt, User user) {
        this.clothingName = clothingName;
        this.clothingType = clothingType;
        this.clothingBrand = clothingBrand;
        this.clothingSize = clothingSize;
        this.clothingColor = clothingColor;
        this.description = description;
        this.createdAt = createdAt;
        this.user = user;
    }
}
