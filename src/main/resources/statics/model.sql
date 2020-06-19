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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

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

insert  into `sys_role`(`role_id`,`role_name`,`remark`,`dept_id`,`create_time`) values (1,'管理员','普通',NULL,'2020-06-19'),(2,'普通用户','吸血',NULL,'2020-06-19');

/*Table structure for table `sys_role_menu` */

DROP TABLE IF EXISTS `sys_role_menu`;

CREATE TABLE `sys_role_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色id',
  `menu_id` bigint(20) DEFAULT NULL COMMENT '菜单id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `sys_role_menu` */

insert  into `sys_role_menu`(`id`,`role_id`,`menu_id`) values (8,1,0),(9,1,1),(10,1,2),(11,1,3),(12,1,4),(13,2,0),(14,2,1),(15,2,4);

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(50) DEFAULT NULL COMMENT '账户',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `user_type` tinyint(1) DEFAULT NULL COMMENT '用户类型（1普通用户 3管理员）',
  `chinese_name` varchar(20) DEFAULT NULL COMMENT '用户姓名',
  `status` int(1) DEFAULT NULL COMMENT '1.激活',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `sys_user` */

insert  into `sys_user`(`user_id`,`username`,`password`,`user_type`,`chinese_name`,`status`) values (1,'admin','admin',0,'管理员',1),(2,'Robin','123',1,'罗宾',1),(3,'lufei','123',1,'路飞',1);

/*Table structure for table `sys_user_role` */

DROP TABLE IF EXISTS `sys_user_role`;

CREATE TABLE `sys_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `sys_user_role` */

insert  into `sys_user_role`(`id`,`user_id`,`role_id`) values (1,1,1),(6,2,2),(7,3,2);

/*Table structure for table `t_hotel` */

DROP TABLE IF EXISTS `t_hotel`;

CREATE TABLE `t_hotel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '酒店名称',
  `location` varchar(100) DEFAULT NULL COMMENT '酒店位置',
  `room` int(4) DEFAULT NULL COMMENT '房间数',
  `phone` varchar(100) DEFAULT NULL COMMENT '联系方式',
  `user_id` bigint(20) DEFAULT NULL COMMENT '创建人',
  `status` int(1) DEFAULT '0' COMMENT '0 未激活 1 激活',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `t_hotel` */

insert  into `t_hotel`(`id`,`name`,`location`,`room`,`phone`,`user_id`,`status`) values (1,'北京国际酒店','北京市朝阳区酒仙桥接到',4,'1662626262626',NULL,1),(3,'香格里拉','北京市朝阳区',4,'188687682314',NULL,1),(4,'罗宾的酒店','北京',100,'123123123',35,1),(5,'1','1',1,'1',1,1),(6,'1','1',1,'1',1,1),(7,'1','3',1,'1',1,1),(8,'1','2312',31,'1',1,1),(9,'3','3',3,'3',3,3),(10,'3','4',4,'44',4,4);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
