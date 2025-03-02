package com.project.ThriftFits.service;

import com.project.ThriftFits.model.Advertisement;

import java.util.List;

public interface UserService {

    List<Advertisement> getAdsFromUser(String username);
}
