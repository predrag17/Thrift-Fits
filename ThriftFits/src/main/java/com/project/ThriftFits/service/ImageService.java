package com.project.ThriftFits.service;

import org.springframework.core.io.Resource;

import java.io.IOException;

public interface ImageService {

    String getImageById(Long id) throws IOException;
}
