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
import java.util.List;

import static com.google.common.hash.Hashing.sha256;

@Service
@RequiredArgsConstructor
@Log4j2
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JWTManager jwtManager;

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

    @Override
    public UserDTO getUser(String username) {
        UserEntity user = userRepository.findByUsername(username);
        if(user == null) throw new CustomException(false, "User not found");
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setPassword(null);
        return userDTO;
    }

    @Override
    public CreateUserReqDTO updateUser(CreateUserReqDTO dto) {
        try{
            log.info("Execute method updateUser");

            UserEntity user = userRepository.findByUsername(dto.getUsername());
            if(user == null) throw new CustomException(false, "User not found");

            if(dto.getPassword() != null) {
                String password = sha256().hashString(dto.getPassword(), StandardCharsets.UTF_8).toString();
                user.setPassword(password);
            }
            user.setMobileNumber(dto.getMobileNumber());
            user.setFirstName(dto.getFirstName());
            user.setLastName(dto.getLastName());
            user.setEmail(dto.getEmail());

            userRepository.save(user);
            dto.setPassword(null);
            return dto;
        }catch (Exception e){
            log.error("Method updateUser : ", e);
            throw e;
        }
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<UserDTO> allUsers = userRepository.getAllUsers();
        return allUsers;
    }
}
