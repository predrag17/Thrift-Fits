package com.project.ThriftFits.model.DTO;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    private String fullName;
    private String instagramUsername;
    private String phone;
    private String email;
    private String username;
    private String password;
}
