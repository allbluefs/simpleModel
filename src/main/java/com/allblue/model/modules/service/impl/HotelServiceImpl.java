package com.allblue.model.modules.service.impl;

import com.allblue.model.modules.entity.Hotel;
import com.allblue.model.modules.dao.HotelMapper;
import com.allblue.model.modules.service.IHotelService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author fs
 * @since 2020-06-11
 */
@Service
public class HotelServiceImpl extends ServiceImpl<HotelMapper, Hotel> implements IHotelService {

}
