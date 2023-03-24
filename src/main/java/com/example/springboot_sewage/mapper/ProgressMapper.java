package com.example.springboot_sewage.mapper;


import com.example.springboot_sewage.pojo.Progress;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface ProgressMapper {
    List<Progress> findProgresss();

    void insertProgress(Progress progress);

    boolean updateProgress(Progress progress);

    void deleteProgress(Integer id);
}
