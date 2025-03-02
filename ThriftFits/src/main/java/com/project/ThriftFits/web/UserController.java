package com.project.ThriftFits.web;

import com.project.ThriftFits.model.Advertisement;
import com.project.ThriftFits.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000",
        "http://thrift-fits-app.s3-website.eu-central-1.amazonaws.com/"})
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<List<Advertisement>> getAllAdsFromUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.getAdsFromUser(username));
    }

}
