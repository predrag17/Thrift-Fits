package com.project.ThriftFits.auth.controller;

import com.project.ThriftFits.auth.model.AuthenticationResponse;
import com.project.ThriftFits.auth.service.AuthenticationService;
import com.project.ThriftFits.model.DTO.AuthenticationRequest;
import com.project.ThriftFits.model.DTO.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000",
        "http://thrift-fits-app.s3-website.eu-central-1.amazonaws.com/"})
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
