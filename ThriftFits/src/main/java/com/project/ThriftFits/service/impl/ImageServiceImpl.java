package com.project.ThriftFits.service.impl;

import com.project.ThriftFits.model.Image;
import com.project.ThriftFits.model.exceptions.InvalidImageIdException;
import com.project.ThriftFits.repository.ImageRepository;
import com.project.ThriftFits.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    @Override
    public String getImageById(Long id) throws IOException {
        Image image = imageRepository.findById(id).orElseThrow(() -> new InvalidImageIdException("Image with that id does not exist"));
        return image.getBase();
    }
}
