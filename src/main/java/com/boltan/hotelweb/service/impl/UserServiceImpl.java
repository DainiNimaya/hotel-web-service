package com.boltan.hotelweb.service.impl;

import com.boltan.hotelweb.dto.UserDTO;
import com.boltan.hotelweb.entity.UserEntity;
import com.boltan.hotelweb.exception.CustomOauthException;
import com.boltan.hotelweb.repository.UserRepository;
import com.boltan.hotelweb.service.UserService;
import com.boltan.hotelweb.utils.EmailValidator;
import com.boltan.hotelweb.utils.PasswordGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service(value = "userService")
@RequiredArgsConstructor
@Log4j2
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    private EmailValidator emailValidator;

//    @Autowired
//    @Qualifier("emailSender")
//    private EmailSender mailSender;

    @Autowired
    private PasswordGenerator passwordGenerator;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        try {
            log.info("Start function loadUserByUsername : {}");
            Optional<UserEntity> user = userRepository.findByEmail(userId);
            if (!user.isPresent()) {
                log.error("loadUserByUsername() : invalid credentials");
                throw new UsernameNotFoundException("Invalid username or password.");
            }
            UserEntity userEntity = user.get();
            // Assuming user type is an Enum
            String roleString = userEntity.getUserRole().toString();

            // Create authorities for the user
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_" + roleString));

            return new org.springframework.security.core.userdetails.User(
                    userEntity.getEmail(),
                    userEntity.getPassword(),
                    authorities);
        } catch (Exception e) {
            log.error("Error in loadUserByUsername: " + e.getMessage(), e);
            throw new RuntimeException("An error occurred while loading user details.", e);
        }
    }

    private List<SimpleGrantedAuthority> getAuthority(UserEntity user) {
        if (user.getUserRole().equals("ACADEMIC_ADMIN")) {
            return Arrays.asList(new SimpleGrantedAuthority(user.getUserRole().toString()));
        }
        throw new UsernameNotFoundException("Access Denied");
    }

    @Override
    public UserDTO getUserDetailsByUserEmail(String userEmail) {
        try {
            // Check if a user with the given email exists
            Optional<UserEntity> byUserEmail = userRepository.findByEmail(userEmail);
            if (!byUserEmail.isPresent()) {
                throw new CustomOauthException("User email not found.");
            } else {
                // Create and return UserDto
                return new UserDTO(
                        byUserEmail.get().getId(),
                        byUserEmail.get().getFirstName(),
                        byUserEmail.get().getLastName(),
                        byUserEmail.get().getEmail(),
                        byUserEmail.get().getMobileNumber(),
                        byUserEmail.get().getPassword(),
                        byUserEmail.get().getUserRole());
            }
        } catch (Exception e) {
            // Log and handle any exceptions
            log.error("Method getUserDetailsByUserEmail : " + e.getMessage(), e);
            throw e;
        }
    }
}
