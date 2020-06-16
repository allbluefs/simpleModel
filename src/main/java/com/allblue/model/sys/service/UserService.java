package com.allblue.model.sys.service;

import com.allblue.model.sys.entity.UserEntity;
import com.allblue.model.utils.PageUtils;
import com.baomidou.mybatisplus.service.IService;

import java.util.Map;

/**
 * 
 * @date 2020-06-16 09:04:34
 */
public interface UserService extends IService<UserEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

