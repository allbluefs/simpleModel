package com.allblue;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"com.allblue.modules.dao","com.allblue.sys.dao"})
public class FastModelApplication {

    public static void main(String[] args) {
        SpringApplication.run(FastModelApplication.class, args);
    }

}
