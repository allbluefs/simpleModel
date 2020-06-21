package com.allblue.model.sys.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @date 2020-06-16 09:04:34
 */
@TableName(value = "sys_user",resultMap = "tUserMap")
@Data
public class UserEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 主键
	 */
	@TableId
	private Long userId;
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
	 * 电话号码
	 */
	private String phoneNumber;
	/**
	 * 邮箱
	 */
	private String email;
	/**
	 * 身份证号
	 */
	private String idCardNumber;
	/**
	 * qq号
	 */
	private String qq;
	private Integer status;
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date createTime;

	@TableField(exist=false)
	private Long roleId;
	@TableField(exist=false)
	private String roleName;
}
