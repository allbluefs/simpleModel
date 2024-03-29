package com.allblue.sys.service.impl;

import com.allblue.sys.dao.UserDao;
import com.allblue.sys.entity.UserEntity;
import com.allblue.sys.entity.UserRoleEntity;
import com.allblue.sys.service.UserRoleService;
import com.allblue.sys.service.UserService;
import com.allblue.utils.PageUtils;
import com.allblue.utils.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.transaction.annotation.Transactional;


@Service("tUserService")
public class UserServiceImpl extends ServiceImpl<UserDao, UserEntity> implements UserService {

    @Autowired
    private UserRoleService userRoleService;
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<UserEntity> page = this.selectPage(
                new Query<UserEntity>(params).getPage(),
                new EntityWrapper<UserEntity>()
        );

        return new PageUtils(page);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void save(UserEntity user) {
        //sha256加密
        this.insert(user);

        saveUserRoleRelation(user);
    }
    @Override
    public void update(UserEntity user) {


        this.updateById(user);

        saveUserRoleRelation(user);
    }
    private void saveUserRoleRelation(UserEntity user) {
        UserRoleEntity userRoleEntity = userRoleService.selectByUserId(user.getUserId());
        if (userRoleEntity == null) {
            userRoleEntity = new UserRoleEntity();
            userRoleEntity.setUserId(user.getUserId());
            userRoleEntity.setRoleId(user.getRoleId());
            userRoleService.insert(userRoleEntity);
        } else {
            userRoleEntity.setUserId(user.getUserId());
            userRoleEntity.setRoleId(user.getRoleId());
            userRoleService.updateAllColumnById(userRoleEntity);
        }

    }

    @Override
    public List<Long> queryAllMenuId(Long userId) {

        return baseMapper.queryAllMenuId(userId);
    }
}
