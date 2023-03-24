package com.example.springboot_sewage.service;


import com.example.springboot_sewage.pojo.User;

public interface UserService {
    User userLogin(String username, String password);
}



