package com.example.springboot_sewage.controller;

import com.example.springboot_sewage.pojo.User;
import com.example.springboot_sewage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
@SessionAttributes("loginUser")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public ResponseEntity<Void> userLogin(String username, String password, Map<String,Object> map){
        try {
            System.out.println(username);
            System.out.println(password);
            User user = userService.userLogin(username,password);
            if (user == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            map.put("loginUser",user);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @RequestMapping(value="/login",method = RequestMethod.GET)
    public ResponseEntity<User> checkLogin(HttpServletRequest request){
        try {
            HttpSession session = request.getSession();
            User loginUser = (User) session.getAttribute("loginUser");
            if(loginUser == null){
                return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(loginUser);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
    @RequestMapping(value="/login",method = RequestMethod.DELETE)
    public ResponseEntity<User> userLoginOut(HttpServletRequest request,Map<String,Object> map) {
        try {
            map.remove("loginUser");
            request.getSession().invalidate();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}

