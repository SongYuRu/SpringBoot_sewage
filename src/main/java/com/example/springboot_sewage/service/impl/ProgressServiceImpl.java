package com.example.springboot_sewage.service.impl;


import com.example.springboot_sewage.mapper.ProgressMapper;
import com.example.springboot_sewage.pojo.Progress;
import com.example.springboot_sewage.service.ProgressService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("progressService")
public class ProgressServiceImpl implements ProgressService {

    @Autowired
    private ProgressMapper progressMapper;

    @Override
    public PageInfo<Progress> findProgressByPage(Integer pageNum1, Integer pageSize) {
        try {
            PageHelper.startPage(pageNum1,pageSize);
            List<Progress> resumeList = progressMapper.findProgresss();
            PageInfo<Progress> pageInfo = new PageInfo<Progress>(resumeList,5);
            return pageInfo;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //添加
    @Override
    public void insertProgress(Progress progress) {
        progressMapper.insertProgress(progress);
    }




    //修改
    @Override
    public boolean updateProgress(Progress progress) {
        return progressMapper.updateProgress(progress);
    }
    //删除
    @Override
    public void deleteProgress(Integer id) {
        progressMapper.deleteProgress(id);
    }

}
