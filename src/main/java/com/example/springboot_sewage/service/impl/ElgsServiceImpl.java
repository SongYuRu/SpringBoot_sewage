package com.example.springboot_sewage.service.impl;

import com.example.springboot_sewage.mapper.ElgsMapper;
import com.example.springboot_sewage.pojo.Elgs;
import com.example.springboot_sewage.service.ElgsService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("elgsService")
public class ElgsServiceImpl  implements ElgsService {

    @Autowired
    private ElgsMapper elgsMapper;

    @Override
    public PageInfo<Elgs> findElgsByPage(Integer pageNum, Integer pageSize) {
        try {
            PageHelper.startPage(pageNum,pageSize);
            List<Elgs> resumeList = elgsMapper.findElgss();
            PageInfo<Elgs> pageInfo = new PageInfo<Elgs>(resumeList,5);
            return pageInfo;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //添加
    @Override
    public void insertElgs(Elgs elgs) {
        elgsMapper.insertElgs(elgs);
    }




//修改
    @Override
    public boolean updateElgs(Elgs elgs) {
        return elgsMapper.updateElgs(elgs);
    }
    //删除
    @Override
    public void deleteElgs(Integer id) {
        elgsMapper.deleteElgs(id);
    }


}
