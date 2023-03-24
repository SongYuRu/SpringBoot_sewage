package com.example.springboot_sewage.service.impl;

import com.example.springboot_sewage.mapper.UserMapper;
import com.example.springboot_sewage.pojo.User;
import com.example.springboot_sewage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {


    @Autowired
    private UserMapper userMapper;

    @Override
    public User userLogin(String username, String password) {
        return userMapper.findUserByNameAndPass(username,password);
    }
}