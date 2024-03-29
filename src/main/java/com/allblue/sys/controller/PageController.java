package com.allblue.sys.controller;/**
 * @Description
 * @Author fs
 * @Date 2020/6/15 17:51
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 @Date:2020/6/15
 */
@Controller
public class PageController {

    @RequestMapping("/")
    public Object login() {
        return "login";
    }
    @RequestMapping("index.html")
    public Object index() {
        return "index";
    }
    @RequestMapping("register.html")
    public Object register() {
        return "register";
    }
    @RequestMapping("main.html")
    public String main() {
        return "main";
    }
    @RequestMapping("modules/{url}.html")
    public String module( @PathVariable("url") String url) {
        return "modules/"+ url;
    }
    @RequestMapping("modules/{module}/{url}.html")
    public String module2(@PathVariable("module") String module, @PathVariable("url") String url) {
        return "modules/" + module + "/" + url;
    }
}
