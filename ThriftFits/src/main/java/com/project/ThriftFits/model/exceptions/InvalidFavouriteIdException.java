package com.project.ThriftFits.model.exceptions;

public class InvalidFavouriteIdException extends RuntimeException{

    public InvalidFavouriteIdException() {
        super("Invalid favourite id");
    }
}
