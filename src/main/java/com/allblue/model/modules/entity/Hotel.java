package com.allblue.model.modules.entity;

import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author fs
 * @since 2020-06-11
 */
@TableName("t_hotel")
public class Hotel extends Model<Hotel> {

    private static final long serialVersionUID = 1L;

    @TableId
    private Long id;
    /**
     * 酒店名称
     */
    private String name;
    /**
     * 酒店位置
     */
    private String location;
    /**
     * 房间数
     */
    private Integer room;
    /**
     * 联系方式
     */
    private String phone;
    /**
     * 创建人
     */
    @TableField("user_id")
    private Long userId;
    /**
     * 0 未激活 1 激活
     */
    private Integer status;


    public Long getId() {
        return id;
    }

    public Hotel setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Hotel setName(String name) {
        this.name = name;
        return this;
    }

    public String getLocation() {
        return location;
    }

    public Hotel setLocation(String location) {
        this.location = location;
        return this;
    }

    public Integer getRoom() {
        return room;
    }

    public Hotel setRoom(Integer room) {
        this.room = room;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public Hotel setPhone(String phone) {
        this.phone = phone;
        return this;
    }

    public Long getUserId() {
        return userId;
    }

    public Hotel setUserId(Long userId) {
        this.userId = userId;
        return this;
    }

    public Integer getStatus() {
        return status;
    }

    public Hotel setStatus(Integer status) {
        this.status = status;
        return this;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "Hotel{" +
        "id=" + id +
        ", name=" + name +
        ", location=" + location +
        ", room=" + room +
        ", phone=" + phone +
        ", userId=" + userId +
        ", status=" + status +
        "}";
    }
}
