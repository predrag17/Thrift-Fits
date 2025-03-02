package com.project.ThriftFits.service;

import com.project.ThriftFits.model.Advertisement;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AdvertisementService {

    List<Advertisement> getAllAds();

    Advertisement getAdById(Long id);

    Advertisement updateAd(Long id, String clothingName, String clothingBrand, String clothingType, String clothingSize, String clothingColor, String description, MultipartFile image) throws IOException;

    void deleteAd(Long id);

    List<Advertisement> getNewestAds();


    List<Advertisement> filtered(String clothingName, String clothingBrand, String clothingType, String clothingSize, String clothingColor);

    List<Advertisement> loggedInUserAds();

    List<Advertisement> sortAds(String sortOption);

    List<Advertisement> searchAds(String searchText);

    Advertisement create(String clothingName, String clothingBrand, String clothingType, String clothingSize, String clothingColor, String description, MultipartFile image) throws IOException;
}
