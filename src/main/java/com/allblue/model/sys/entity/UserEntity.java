package com.allblue.model.sys.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @date 2020-06-16 09:04:34
 */
@TableName("sys_user")
public class UserEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 主键
	 */
	@TableId
	private Long id;
	/**
	 * 账户
	 */
	private String username;
	/**
	 * 密码
	 */
	private String password;
	/**
	 * 用户类型（1普通用户 3管理员）
	 */
	private Integer userType;
	/**
	 * 用户姓名
	 */
	private String chineseName;

	/**
	 * 设置：主键
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 获取：主键
	 */
	public Long getId() {
		return id;
	}
	/**
	 * 设置：账户
	 */
	public void setUsername(String username) {
		this.username = username;
	}
	/**
	 * 获取：账户
	 */
	public String getUsername() {
		return username;
	}
	/**
	 * 设置：密码
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * 获取：密码
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * 设置：用户类型（1普通用户 3管理员）
	 */
	public void setUserType(Integer userType) {
		this.userType = userType;
	}
	/**
	 * 获取：用户类型（1普通用户 3管理员）
	 */
	public Integer getUserType() {
		return userType;
	}
	/**
	 * 设置：用户姓名
	 */
	public void setChineseName(String chineseName) {
		this.chineseName = chineseName;
	}
	/**
	 * 获取：用户姓名
	 */
	public String getChineseName() {
		return chineseName;
	}
}
