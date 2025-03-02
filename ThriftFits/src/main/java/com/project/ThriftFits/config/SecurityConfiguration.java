package com.project.ThriftFits.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {


    private final JwtAuthFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((request) -> request
                        .requestMatchers(
                                AntPathRequestMatcher.antMatcher("/resources/static/images/**"),
                                AntPathRequestMatcher.antMatcher("/api/auth/register"),
                                AntPathRequestMatcher.antMatcher("/api/auth/authenticate"),
                                AntPathRequestMatcher.antMatcher("/api/ads/newest"),
                                AntPathRequestMatcher.antMatcher("/api/img/**/details"),
                                AntPathRequestMatcher.antMatcher("/api/ads"),
                                AntPathRequestMatcher.antMatcher("/api/user/**"),
                                AntPathRequestMatcher.antMatcher("/api/search"),
                                AntPathRequestMatcher.antMatcher("/api/ads/filtered"),
                                AntPathRequestMatcher.antMatcher("/api/ads/sorted"),
                                AntPathRequestMatcher.antMatcher("/api/ads/{id}/details")
                        )
                        .permitAll()
                        .anyRequest()
                        .authenticated()
                )
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
