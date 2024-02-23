package com.boltan.hotelweb.service.impl;

import com.boltan.hotelweb.dto.UserDTO;
import com.boltan.hotelweb.dto.request.CreateUserReqDTO;
import com.boltan.hotelweb.dto.request.LoginReqDTO;
import com.boltan.hotelweb.dto.response.TokenResponseDTO;
import com.boltan.hotelweb.entity.UserEntity;
import com.boltan.hotelweb.exception.CustomException;
import com.boltan.hotelweb.repository.UserRepository;
import com.boltan.hotelweb.service.UserService;
import com.boltan.hotelweb.utils.EmailValidator;
import com.boltan.hotelweb.utils.JWTManager;
import com.boltan.hotelweb.utils.PasswordGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;

import static com.google.common.hash.Hashing.sha256;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JWTManager jwtManager;


//    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
//
//        try {
//            log.info("Start function loadUserByUsername : {}");
//            Optional<UserEntity> user = userRepository.findByEmail(userId);
//            if (!user.isPresent()) {
//                log.error("loadUserByUsername() : invalid credentials");
//                throw new UsernameNotFoundException("Invalid username or password.");
//            }
//            UserEntity userEntity = user.get();
//            // Assuming user type is an Enum
//            String roleString = userEntity.getUserRole().toString();
//
//            // Create authorities for the user
//            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//            authorities.add(new SimpleGrantedAuthority("ROLE_" + roleString));
//
//            return new org.springframework.security.core.userdetails.User(
//                    userEntity.getEmail(),
//                    userEntity.getPassword(),
//                    authorities);
//        } catch (Exception e) {
//            log.error("Error in loadUserByUsername: " + e.getMessage(), e);
//            throw new RuntimeException("An error occurred while loading user details.", e);
//        }
//    }

//    private List<SimpleGrantedAuthority> getAuthority(UserEntity user) {
//        if (user.getUserRole().equals("ACADEMIC_ADMIN")) {
//            return Arrays.asList(new SimpleGrantedAuthority(user.getUserRole().toString()));
//        }
//        throw new UsernameNotFoundException("Access Denied");
//    }
//
//    @Override
//    public UserDTO getUserDetailsByUserEmail(String userEmail) {
//        try {
//            // Check if a user with the given email exists
//            Optional<UserEntity> byUserEmail = userRepository.findByEmail(userEmail);
//            if (!byUserEmail.isPresent()) {
//                throw new CustomOauthException("User email not found.");
//            } else {
//                // Create and return UserDto
//                return new UserDTO(
//                        byUserEmail.get().getId(),
//                        byUserEmail.get().getFirstName(),
//                        byUserEmail.get().getLastName(),
//                        byUserEmail.get().getEmail(),
//                        byUserEmail.get().getMobileNumber(),
//                        byUserEmail.get().getPassword(),
//                        byUserEmail.get().getUserRole());
//            }
//        } catch (Exception e) {
//            // Log and handle any exceptions
//            log.error("Method getUserDetailsByUserEmail : " + e.getMessage(), e);
//            throw e;
//        }
//    }

    @Override
    public UserDTO createUser(CreateUserReqDTO dto) {
        try{
            log.info("Execute method createUser");

            UserEntity user = userRepository.findByUsername(dto.getUsername());
            if (user != null) throw new CustomException(false,"This username already exists.");

            // encode password from simple way
            String password = sha256().hashString(dto.getPassword(), StandardCharsets.UTF_8).toString();
            dto.setPassword(password);

            user = modelMapper.map(dto,UserEntity.class);

            userRepository.save(user);
            dto.setPassword("**");

            UserDTO userDTO = modelMapper.map(dto, UserDTO.class);

            return userDTO;
        }catch (Exception e){
            log.error("Function createUser : ", e);
            throw e;
        }
    }

    @Override
    public TokenResponseDTO requestToken(LoginReqDTO dto) {
        try{
            log.info("Execute method requestToken");

            UserEntity user = userRepository.findByUsername(dto.getUsername());
            if (user == null) throw new CustomException(false,"User not found");

            String password = sha256().hashString(dto.getPassword(), StandardCharsets.UTF_8).toString();
            if(!user.getPassword().equals(password))
                throw new CustomException(false, "Incorrect password");

            String token = jwtManager.signJWS(user.getMobileNumber(), password);

            UserDTO userDTO = modelMapper.map(user,UserDTO.class);
            userDTO.setPassword("**");
            return new TokenResponseDTO(token,userDTO);
        }catch (Exception e){
            log.error("Function requestToken : ", e);
            throw e;
        }
    }
}
