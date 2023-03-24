package com.example.springboot_sewage.service;
import com.example.springboot_sewage.pojo.Elgs;
import com.github.pagehelper.PageInfo;


public interface ElgsService {

   PageInfo<Elgs> findElgsByPage (Integer pageNum, Integer pageSize);

   void insertElgs(Elgs elgs);

   boolean updateElgs(Elgs elgs);

   void deleteElgs(Integer id);

}
