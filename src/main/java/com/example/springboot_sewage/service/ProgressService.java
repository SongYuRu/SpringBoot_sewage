package com.example.springboot_sewage.service;
import com.example.springboot_sewage.pojo.Progress;
import com.github.pagehelper.PageInfo;

public interface ProgressService {
    PageInfo<Progress> findProgressByPage (Integer pageNum1, Integer pageSize);

    void insertProgress(Progress progress);

    boolean updateProgress(Progress progress);

    void deleteProgress(Integer id);
}
