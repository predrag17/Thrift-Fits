package com.project.ThriftFits.service.impl;

import com.project.ThriftFits.model.Advertisement;
import com.project.ThriftFits.model.User;
import com.project.ThriftFits.model.exceptions.InvalidUsernameException;
import com.project.ThriftFits.repository.UserRepository;
import com.project.ThriftFits.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<Advertisement> getAdsFromUser(String username) {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new InvalidUsernameException("User with that username does not exist"));

        return user.getAdvertisements();
    }
}
