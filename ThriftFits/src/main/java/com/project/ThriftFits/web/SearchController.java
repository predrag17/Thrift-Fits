package com.project.ThriftFits.web;

import com.project.ThriftFits.model.Advertisement;
import com.project.ThriftFits.service.AdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000",
        "http://thrift-fits-app.s3-website.eu-central-1.amazonaws.com/"})
@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final AdvertisementService advertisementService;

    @PostMapping
    public ResponseEntity<List<Advertisement>> search(@RequestParam String searchText) {
        return ResponseEntity.ok(advertisementService.searchAds(searchText));
    }
}
