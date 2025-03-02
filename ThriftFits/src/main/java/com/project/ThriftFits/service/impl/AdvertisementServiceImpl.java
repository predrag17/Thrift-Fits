package com.project.ThriftFits.service.impl;

import com.project.ThriftFits.model.Advertisement;
import com.project.ThriftFits.model.Image;
import com.project.ThriftFits.model.User;
import com.project.ThriftFits.model.exceptions.InvalidAdIdException;
import com.project.ThriftFits.model.exceptions.InvalidFileException;
import com.project.ThriftFits.repository.AdvertisementRepository;
import com.project.ThriftFits.repository.ImageRepository;
import com.project.ThriftFits.repository.UserRepository;
import com.project.ThriftFits.service.AdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AdvertisementServiceImpl implements AdvertisementService {

    private final AdvertisementRepository advertisementRepository;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    @Override
    public List<Advertisement> getAllAds() {
        return advertisementRepository.findAll();
    }

    @Override
    public Advertisement getAdById(Long id) {
        return advertisementRepository.findById(id).orElseThrow(() -> new InvalidAdIdException(id));
    }

    @Override
    public Advertisement updateAd(
            Long id,
            String clothingName,
            String clothingBrand,
            String clothingType,
            String clothingSize,
            String clothingColor,
            String description,
            MultipartFile image
    ) throws IOException {
        Advertisement advertisement = getAdById(id);

        advertisement.setClothingName(clothingName);
        advertisement.setClothingBrand(clothingBrand);
        advertisement.setClothingType(clothingType);
        advertisement.setClothingSize(clothingSize);
        advertisement.setClothingColor(clothingColor);
        advertisement.setDescription(description);

        String imageNewName = saveNameAsPng(image);
        byte[] imageData = image.getBytes();
        String base64Image = Base64.getEncoder().encodeToString(imageData);

        advertisement.getImage().setName(imageNewName);
        advertisement.getImage().setBase(base64Image);


        return advertisementRepository.save(advertisement);
    }


    @Override
    public void deleteAd(Long id) {
        Advertisement advertisement = getAdById(id);

        imageRepository.delete(advertisement.getImage());
        advertisementRepository.delete(advertisement);

    }

    @Override
    public List<Advertisement> getNewestAds() {
        return advertisementRepository.findTop8ByOrderByCreatedAtDesc();
    }

    @Override
    public List<Advertisement> filtered(String clothingName, String clothingBrand, String clothingType, String clothingSize, String clothingColor) {
        if (clothingName == null && clothingBrand == null && clothingType == null && clothingSize == null && clothingColor == null) {
            return getAllAds();
        }

        return advertisementRepository.findByClothingAttributes(
                clothingName,
                clothingBrand,
                clothingType,
                clothingSize,
                clothingColor
        );
    }

    @Override
    public List<Advertisement> loggedInUserAds() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = (User) userDetailsService.loadUserByUsername(username);

        return user.getAdvertisements();
    }

    @Override
    public List<Advertisement> sortAds(String sortOption) {
        if (sortOption.equals("newest")) {
            return advertisementRepository.findAllByOrderByCreatedAtDesc();
        }

        return advertisementRepository.findAllByOrderByCreatedAtAsc();
    }

    @Override
    public List<Advertisement> searchAds(String searchText) {
        User user = userRepository.findByUsernameIsContainingIgnoreCase(searchText);

        if (user != null) {
            return user.getAdvertisements();
        }

        return advertisementRepository.findByClothingNameContainingIgnoreCase(searchText);
    }

    @Override
    public Advertisement create(
            String clothingName,
            String clothingBrand,
            String clothingType,
            String clothingSize,
            String clothingColor,
            String description,
            MultipartFile image) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = (User) userDetailsService.loadUserByUsername(username);

        String imageNewName = saveNameAsPng(image);
        byte[] imageData = image.getBytes();
        String base64Image = Base64.getEncoder().encodeToString(imageData);

        Image img = new Image();
        img.setName(imageNewName);
        img.setBase(base64Image);

        img = imageRepository.save(img);

        Advertisement advertisement = new Advertisement(
                clothingName,
                clothingType,
                clothingBrand,
                clothingSize,
                clothingColor,
                description,
                LocalDateTime.now(),
                user
        );

        advertisement.setImage(img);

        advertisementRepository.save(advertisement);

        return advertisement;
    }

    private String saveNameAsPng(MultipartFile image) {
        if (List.of(MediaType.IMAGE_JPEG, MediaType.IMAGE_PNG).equals(image.getContentType())) {
            throw new InvalidFileException();
        }

        if (image.getContentType().equals(".png")) {
            return image.getOriginalFilename();
        }

        String originalName = image.getOriginalFilename();
        return originalName.substring(0, originalName.lastIndexOf('.')) + ".png";
    }

}
