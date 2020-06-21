/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 5.7.30 : Database - model
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`model` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `model`;

/*Table structure for table `sys_menu` */

DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `menu_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_Id` bigint(20) DEFAULT NULL COMMENT '父菜单id',
  `name` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `perms` varchar(1000) DEFAULT NULL,
  `type` int(1) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `order_num` int(4) DEFAULT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `sys_menu` */

insert  into `sys_menu`(`menu_id`,`parent_Id`,`name`,`url`,`perms`,`type`,`icon`,`order_num`) values (1,0,'系统管理','',NULL,0,'fa fa-cog',0),(2,1,'菜单管理','modules/sys/menu.html','',1,'fa fa-th-list',2),(3,1,'用户管理','modules/sys/user.html',NULL,1,'fa fa-user',1),(4,1,'角色管理','modules/sys/role.html',NULL,1,'fa fa-user-secret',3);

/*Table structure for table `sys_role` */

DROP TABLE IF EXISTS `sys_role`;

CREATE TABLE `sys_role` (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) DEFAULT NULL COMMENT '角色名称',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `dept_id` bigint(20) DEFAULT NULL,
  `create_time` date DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `sys_role` */

insert  into `sys_role`(`role_id`,`role_name`,`remark`,`dept_id`,`create_time`) values (1,'管理员','普通',NULL,'2020-06-19'),(2,'学生','吸血',NULL,'2020-06-19');

/*Table structure for table `sys_role_menu` */

DROP TABLE IF EXISTS `sys_role_menu`;

CREATE TABLE `sys_role_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色id',
  `menu_id` bigint(20) DEFAULT NULL COMMENT '菜单id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

/*Data for the table `sys_role_menu` */

insert  into `sys_role_menu`(`id`,`role_id`,`menu_id`) values (8,1,0),(9,1,1),(10,1,2),(11,1,3),(12,1,4),(16,2,0),(17,2,6),(18,2,7);

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(50) DEFAULT NULL COMMENT '账户',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `chinese_name` varchar(20) DEFAULT NULL COMMENT '用户姓名',
  `phone_number` varchar(100) DEFAULT NULL COMMENT '电话号码',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `id_card_number` varchar(100) DEFAULT NULL COMMENT '身份证号',
  `qq` varchar(100) DEFAULT NULL COMMENT 'qq号',
  `user_type` tinyint(1) DEFAULT NULL COMMENT '用户类型（1普通用户 3管理员）',
  `status` int(1) DEFAULT NULL COMMENT '1.激活',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `sys_user` */

insert  into `sys_user`(`user_id`,`username`,`password`,`chinese_name`,`phone_number`,`email`,`id_card_number`,`qq`,`user_type`,`status`,`create_time`) values (1,'admin','admin','管理员','1','123213','123','123',0,1,NULL),(2,'Robin','123','罗宾','2','123','123','123',1,1,NULL),(3,'Luffy','123','路飞','3','123','123','123',1,1,NULL),(36,'Zoro','123','索隆','4','123','123','123',1,NULL,NULL),(37,'Sanji','123',NULL,'1231231','312313','1231231','3123123',1,NULL,'2020-06-21 09:46:34'),(38,'A','123','哈哈哈','12','213','123','123',1,NULL,'2020-06-21 10:53:49');

/*Table structure for table `sys_user_role` */

DROP TABLE IF EXISTS `sys_user_role`;

CREATE TABLE `sys_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `sys_user_role` */

insert  into `sys_user_role`(`id`,`user_id`,`role_id`) values (1,1,1),(6,2,2),(7,3,2),(8,36,2),(9,37,2),(10,38,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
