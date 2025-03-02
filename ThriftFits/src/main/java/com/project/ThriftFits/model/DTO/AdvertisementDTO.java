package com.project.ThriftFits.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdvertisementDTO {

    private String clothingName;
    private String clothingBrand;
    private String clothingType;
    private String clothingSize;
    private String clothingColor;
    private String description;

}
