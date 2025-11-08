package com.project.ThriftFits.web;

import com.project.ThriftFits.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/img")
public class ImageController {

    private final ImageService imageService;

    @GetMapping("{id}/details")
    public ResponseEntity<String> getImageById(@PathVariable Long id) throws IOException {
        String base = imageService.getImageById(id);


        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(base);
    }
}
