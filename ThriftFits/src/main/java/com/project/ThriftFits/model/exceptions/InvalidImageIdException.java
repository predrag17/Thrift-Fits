package com.project.ThriftFits.model.exceptions;

public class InvalidImageIdException extends RuntimeException{

    public InvalidImageIdException(String message) {
        super(message);
    }
}
