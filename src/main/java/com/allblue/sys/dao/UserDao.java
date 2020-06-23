package com.allblue.sys.dao;

import com.allblue.sys.entity.UserEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import java.util.List;

/**
 * 
 * @date 2020-06-16 09:04:34
 */
public interface UserDao extends BaseMapper<UserEntity> {
    /**
     * 查询用户的所有菜单ID
     */
    List<Long> queryAllMenuId(Long userId);
}
