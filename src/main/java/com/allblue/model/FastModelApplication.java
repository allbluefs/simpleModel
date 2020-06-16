package com.allblue.model;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"com.allblue.model.modules.dao","com.allblue.model.sys.dao"})
public class FastModelApplication {

    public static void main(String[] args) {
        SpringApplication.run(FastModelApplication.class, args);
    }

}
