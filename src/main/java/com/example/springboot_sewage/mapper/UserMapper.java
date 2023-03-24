package com.example.springboot_sewage.mapper;
import com.example.springboot_sewage.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    User findUserByNameAndPass(@Param("username") String username,
                               @Param("password") String password);


}

