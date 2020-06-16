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
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父菜单ID，一级菜单为0',
  `name` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `url` varchar(200) DEFAULT NULL COMMENT '菜单URL',
  `perms` varchar(500) DEFAULT NULL COMMENT '授权(多个用逗号分隔，如：user:list,user:create)',
  `type` int(11) DEFAULT NULL COMMENT '类型   0：目录   1：菜单   2：按钮',
  `icon` varchar(50) DEFAULT NULL COMMENT '菜单图标',
  `order_num` int(11) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8 COMMENT='菜单管理';

/*Data for the table `sys_menu` */

insert  into `sys_menu`(`menu_id`,`parent_id`,`name`,`url`,`perms`,`type`,`icon`,`order_num`) values (1,0,'系统管理',NULL,NULL,0,'fa fa-cog',11),(2,1,'用户管理','modules/thotel.html',NULL,1,'fa fa-user',1),(4,1,'菜单管理','modules/sys/menu.html',NULL,1,'fa fa-th-list',3),(6,1,'定时任务','modules/job/schedule.html',NULL,1,'fa fa-tasks',6),(7,1,'参数管理','modules/sys/config.html',NULL,1,'fa fa-sun-o',7),(8,1,'字典管理','modules/sys/dict.html',NULL,1,'fa fa-bookmark-o',8),(9,1,'系统日志','modules/sys/log.html','sys:log:list',1,'fa fa-file-text-o',9);

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `t_hotel` */

insert  into `t_hotel`(`id`,`name`,`location`,`room`,`phone`,`user_id`,`status`) values (1,'北京国际酒店','北京市朝阳区酒仙桥接到',4,'1662626262626',NULL,1),(3,'香格里拉','北京市朝阳区',4,'188687682314',NULL,1),(4,'罗宾的酒店','北京',100,'123123123',35,1);

/*Table structure for table `t_user` */

DROP TABLE IF EXISTS `t_user`;

CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(50) DEFAULT NULL COMMENT '账户',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `user_type` tinyint(1) DEFAULT NULL COMMENT '用户类型（1普通用户 3管理员）',
  `chinese_name` varchar(20) DEFAULT NULL COMMENT '用户姓名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `t_user` */

insert  into `t_user`(`id`,`username`,`password`,`user_type`,`chinese_name`) values (7,'admin','admin',3,'管理员'),(34,'lufei','123',1,'路飞'),(35,'Robin','123',2,'罗宾');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
