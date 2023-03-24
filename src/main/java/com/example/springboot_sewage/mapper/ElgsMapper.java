package com.example.springboot_sewage.mapper;

import com.example.springboot_sewage.pojo.Elgs;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ElgsMapper {
    List<Elgs> findElgss();

    void insertElgs(Elgs elgs);

    boolean updateElgs(Elgs elgs);

    void deleteElgs(Integer id);
}
