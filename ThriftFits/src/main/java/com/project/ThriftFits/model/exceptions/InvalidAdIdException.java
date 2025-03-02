package com.project.ThriftFits.model.exceptions;

public class InvalidAdIdException extends RuntimeException {

    public InvalidAdIdException(Long id) {
        super("The ad with id: " + id + " does not exists");
    }
}
