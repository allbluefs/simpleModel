package com.allblue.sys.dao;

import com.allblue.sys.entity.RoleMenuEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;


import java.util.List;

/**
 * 角色与菜单对应关系
 */
public interface RoleMenuDao extends BaseMapper<RoleMenuEntity> {
    void deleteBatch(List<Long> roleIds);
    List<Long> queryMenuIdList(Long roleId);
}
