package com.allblue.sys.service;

import com.allblue.sys.entity.UserEntity;
import com.allblue.utils.PageUtils;
import com.baomidou.mybatisplus.service.IService;

import java.util.List;
import java.util.Map;

/**
 * 
 * @date 2020-06-16 09:04:34
 */
public interface UserService extends IService<UserEntity> {

    PageUtils queryPage(Map<String, Object> params);

    void save(UserEntity user);
    void update(UserEntity user);
    List<Long> queryAllMenuId(Long userId);

}

