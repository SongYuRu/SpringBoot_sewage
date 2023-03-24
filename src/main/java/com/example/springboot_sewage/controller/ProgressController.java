package com.example.springboot_sewage.controller;
import com.example.springboot_sewage.pojo.Progress;

import com.example.springboot_sewage.service.ProgressService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProgressController {
    @Autowired
    private ProgressService progressService;


    /*分页页面*/
    @RequestMapping(value = "/progress", method = RequestMethod.GET)
    public ResponseEntity<PageInfo<Progress>> findProgressByPage(Integer pageNum1, Integer pageSize) {
        try {
            PageInfo<Progress> pageInfo = progressService.findProgressByPage(pageNum1, pageSize);
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
    @RequestMapping(value = "/progress",method = RequestMethod.POST)
    public ResponseEntity<Void> insertProgress(Progress progress){
        try {
            progressService.insertProgress(progress);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    //   /* 更新修改简历信息*/
    @RequestMapping(value = "/progress",method = RequestMethod.PUT)
    public ResponseEntity<Void> updateProgress(@RequestBody Progress progress){
        try {
            progressService.updateProgress(progress);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    //删除简历信息
    @RequestMapping(value = "/progress/{id}",method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteProgress(@PathVariable("id") Integer id){
        try {
            progressService.deleteProgress(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

}
