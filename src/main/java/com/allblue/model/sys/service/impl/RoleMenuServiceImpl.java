package com.allblue.model.sys.service.impl;

import com.allblue.model.sys.dao.RoleMenuDao;
import com.allblue.model.sys.entity.RoleMenuEntity;
import com.allblue.model.sys.service.RoleMenuService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import org.springframework.stereotype.Service;

import java.util.List;


@Service("roleMenuService")
public class RoleMenuServiceImpl extends ServiceImpl<RoleMenuDao, RoleMenuEntity> implements RoleMenuService {

    @Override
    public void deleteBatch(List<Long> roleIds) {
        baseMapper.deleteBatch(roleIds);
    }

    @Override
    public List<Long> queryMenuIdList(Long roleId) {

        return baseMapper.queryMenuIdList(roleId);
    }
}
