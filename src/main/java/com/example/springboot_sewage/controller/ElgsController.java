package com.example.springboot_sewage.controller;

import com.example.springboot_sewage.pojo.Elgs;
import com.example.springboot_sewage.service.ElgsService;

import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ElgsController {
    @Autowired
    private ElgsService elgsService;


    /*分页页面*/
    @RequestMapping(value = "/elgs", method = RequestMethod.GET)
    public ResponseEntity<PageInfo<Elgs>> findElgsByPage(Integer pageNum, Integer pageSize) {
        try {
            PageInfo<Elgs> pageInfo = elgsService.findElgsByPage(pageNum, pageSize);
            if (pageInfo.getList() == null || pageInfo.getList().size() == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(pageInfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }


    /*添加简历信息*/
    @RequestMapping(value = "/elgs",method = RequestMethod.POST)
    public ResponseEntity<Void> insertElgs(Elgs elgs){
        try {
            elgsService.insertElgs(elgs);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    //   /* 更新修改简历信息*/
    @RequestMapping(value = "/elgs",method = RequestMethod.PUT)
    public ResponseEntity<Void> updateElgs(@RequestBody Elgs elgs){
        try {
            elgsService.updateElgs(elgs);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    //删除简历信息
    @RequestMapping(value = "/elgs/{id}",method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteElgs(@PathVariable("id") Integer id){
        try {
            elgsService.deleteElgs(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

}

