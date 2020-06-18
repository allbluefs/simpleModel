package com.allblue.model.sys.controller;/**
 * @Description
 * @Author fs
 * @Date 2020/6/16 18:01
 */

import com.allblue.model.sys.entity.UserEntity;
import com.allblue.model.sys.service.UserService;
import com.allblue.model.utils.R;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 @Date:2020/6/16
 */
@Controller
public class LoginController {
    @Autowired
    private UserService userService;
    @RequestMapping("/login")
    @ResponseBody
    public R login(UserEntity user, HttpServletRequest request) {
            UserEntity u = null;
            u = userService.selectOne(new EntityWrapper<UserEntity>().eq("username", user.getUsername()));
            if (null == u) {
                return R.error("用户信息不存在");
            } else {
                if (!user.getPassword().equals(u.getPassword())) {
                    return R.error("账号或密码错误");
                }
            }
            // 登录成功，将用户信息保存在session
            request.getSession().setAttribute("user", u);
            return R.ok("登录成功");

    }
    /**
     * 退出登陆
     *
     * @param request
     * @return
     */
    @RequestMapping("/loginOut")
    public String login(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().removeAttribute("user");
        return "login";
    }

    /**
     * 获取登录用户的值
     *
     * @param request
     * @return
     */
    @RequestMapping("/getLoginUserInfo")
    @ResponseBody
    public Object getLoginUserInfo(HttpServletRequest request) {
        return request.getSession().getAttribute("user");
    }

}
