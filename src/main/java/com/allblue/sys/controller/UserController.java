package com.allblue.sys.controller;

import java.util.Arrays;
import java.util.Map;

import com.allblue.sys.entity.UserEntity;
import com.allblue.sys.service.UserService;

import com.allblue.utils.PageUtils;
import com.allblue.utils.R;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;





/**
 * 
 * @date 2020-06-16 09:04:34
 */
@RestController
@RequestMapping("sys/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = userService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 用户信息
     */
    @RequestMapping("/info/{userId}")
    public R info(@PathVariable("userId") Long userId){
        UserEntity user = userService.selectById(userId);
        return R.ok().put("user", user);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody UserEntity user){
        if(user.getPassword().length()<6){
            return R.error("密码至少6位");
        }
        /*if(user.getPartysName()==null){
            user.setPartysName(null);
        }*/
        userService.save(user);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    public R update(@RequestBody UserEntity user){
        userService.update(user);
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] ids){
        userService.deleteBatchIds(Arrays.asList(ids));

        return R.ok();
    }
    /**
     * 用户名检测
     */
    @RequestMapping("/detect")
    public R detect(UserEntity user){
        if (user.getUserId() == null) {
            int count = userService.selectCount(new EntityWrapper<UserEntity>().eq("username", user.getUsername()));
            if (count > 0) {
                return R.ok().put("valid", false);
            }
        } else {
            int count = userService.selectCount(new EntityWrapper<UserEntity>().eq("username", user.getUsername()).ne("user_id", user.getUserId()));
            if (count > 0) {
                return R.ok().put("valid", false);
            }
        }

        return R.ok().put("valid", true);
    }

}
