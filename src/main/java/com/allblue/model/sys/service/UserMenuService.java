package com.allblue.model.sys.service;

import com.allblue.model.sys.entity.UserMenuEntity;
import com.allblue.model.utils.PageUtils;
import com.baomidou.mybatisplus.service.IService;
import java.util.Map;

/**
 * 
 * @date 2020-06-18 17:39:45
 */
public interface UserMenuService extends IService<UserMenuEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

