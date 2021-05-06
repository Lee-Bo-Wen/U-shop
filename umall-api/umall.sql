/*
Navicat MySQL Data Transfer

Source Server         : lbw
Source Server Version : 50549
Source Host           : localhost:3306
Source Database       : umall

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2021-04-25 17:01:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '轮播图id',
  `title` varchar(50) NOT NULL COMMENT '轮播图标题',
  `img` varchar(255) NOT NULL COMMENT '轮播图图片地址',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='轮播图表';

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('1', 'b1', '/uploads/banner/d3fb7980-a34b-11eb-9e8a-dbc87df5adbe.webp', '1');
INSERT INTO `banner` VALUES ('2', 'b2', '/uploads/banner/da22cac0-a34b-11eb-9e8a-dbc87df5adbe.jpg', '1');
INSERT INTO `banner` VALUES ('3', 'b3', '/uploads/banner/e01e2a00-a34b-11eb-9e8a-dbc87df5adbe.webp', '1');
INSERT INTO `banner` VALUES ('4', 'b4', '/uploads/banner/e598c080-a34b-11eb-9e8a-dbc87df5adbe.webp', '1');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '购物车主键',
  `uid` varchar(50) NOT NULL COMMENT '用户id',
  `goodsid` int(11) NOT NULL COMMENT '商品编号',
  `num` tinyint(3) NOT NULL COMMENT '数量',
  `status` tinyint(1) NOT NULL COMMENT '选中状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uid` (`uid`,`goodsid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='购物车表';

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类编号',
  `pid` smallint(5) unsigned NOT NULL COMMENT '上级分类编号',
  `catename` varchar(50) NOT NULL COMMENT '分类名称',
  `img` varchar(255) NOT NULL COMMENT '分类图片',
  `status` tinyint(1) unsigned NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品分类表';

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('4', '0', '家用电器', '', '1');
INSERT INTO `category` VALUES ('5', '0', '手机数码', '', '1');
INSERT INTO `category` VALUES ('6', '0', '办公设备', '', '1');
INSERT INTO `category` VALUES ('7', '0', '配件', '', '1');
INSERT INTO `category` VALUES ('9', '4', '冰箱', '', '1');
INSERT INTO `category` VALUES ('10', '4', '洗衣机', '', '1');
INSERT INTO `category` VALUES ('12', '5', '苹果手机', '', '1');
INSERT INTO `category` VALUES ('13', '5', '华为手机', '', '1');
INSERT INTO `category` VALUES ('14', '5', '相机', '', '1');
INSERT INTO `category` VALUES ('15', '6', '打印机', '', '1');
INSERT INTO `category` VALUES ('16', '6', '碎纸机', '', '1');
INSERT INTO `category` VALUES ('17', '7', '耳机', '', '1');
INSERT INTO `category` VALUES ('18', '7', '数据线', '', '1');
INSERT INTO `category` VALUES ('19', '4', '空调', '', '1');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品编号',
  `first_cateid` smallint(5) unsigned NOT NULL COMMENT '一级分类编号',
  `second_cateid` smallint(6) NOT NULL COMMENT '二级分类编号',
  `goodsname` varchar(100) NOT NULL COMMENT '商品名称',
  `price` decimal(10,2) NOT NULL COMMENT '商品价格',
  `market_price` decimal(10,2) NOT NULL COMMENT '市场价格',
  `img` varchar(255) NOT NULL COMMENT '商品图片',
  `description` text COMMENT '商品描述',
  `specsid` int(11) NOT NULL COMMENT '规格id',
  `specsattr` varchar(255) NOT NULL COMMENT '规则属性值',
  `isnew` tinyint(1) NOT NULL COMMENT '是否新品1是2不是',
  `ishot` tinyint(1) NOT NULL COMMENT '是否热卖1是2不是',
  `status` tinyint(1) NOT NULL COMMENT '状态1启用2禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品表';

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '4', '9', '卡萨帝', '13222.00', '14333.00', '/uploads/8bab1860-a34c-11eb-9e8a-dbc87df5adbe.jpg', '<p>贼贵！！！！！！<img src=\"https://img30.360buyimg.com/sku/jfs/t1/167527/10/18605/203266/6074f4d3E29fae267/b5cfe10b6aee9ec3.jpg\" style=\"text-align: initial; max-width: 100%;\"/></p>', '4', '黑,白,灰', '1', '1', '1');
INSERT INTO `goods` VALUES ('2', '4', '9', '海尔冰箱', '1333.00', '1444.00', '/uploads/aa8c5e60-a34c-11eb-9e8a-dbc87df5adbe.jpg', '<p>国货之光</p>', '3', '大,中,小', '2', '1', '1');
INSERT INTO `goods` VALUES ('3', '4', '10', '洗衣机', '1113.00', '1555.00', '/uploads/d2227e50-a34c-11eb-9e8a-dbc87df5adbe.jpg', '<p>这是一个洗衣机</p>', '4', '灰,白,黑', '2', '1', '1');
INSERT INTO `goods` VALUES ('4', '4', '19', '格力空调', '2222.00', '3333.00', '/uploads/f4c5ae50-a34c-11eb-9e8a-dbc87df5adbe.jpg', '<p>好空调格力造</p>', '4', '白', '1', '1', '1');
INSERT INTO `goods` VALUES ('5', '5', '12', '苹果手机', '9999.00', '12333.00', '/uploads/1034ff10-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>苹果手机</p>', '3', '大,中,小', '2', '2', '1');
INSERT INTO `goods` VALUES ('6', '5', '13', '华为手机', '6666.00', '7777.00', '/uploads/2440ae00-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>华为5G手机</p>', '4', '黑,白,灰', '1', '1', '1');
INSERT INTO `goods` VALUES ('7', '5', '13', '华为', '4444.00', '5555.00', '/uploads/3b982c90-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>华为的手机</p>', '3', '大,中,小', '2', '1', '1');
INSERT INTO `goods` VALUES ('8', '5', '14', '莱卡相机', '9999.00', '16666.00', '/uploads/5269b240-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>莱卡相机</p>', '4', '灰,黑,白', '1', '1', '1');
INSERT INTO `goods` VALUES ('9', '5', '14', '索尼相机', '8888.00', '9999.00', '/uploads/671300c0-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>索尼相机</p>', '3', '大,中,小', '2', '2', '1');
INSERT INTO `goods` VALUES ('10', '6', '15', '得力打印机', '2222.00', '3333.00', '/uploads/98d1fd00-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>一用就卡纸的打印机</p>', '4', '灰,白,黑', '1', '1', '1');
INSERT INTO `goods` VALUES ('11', '6', '16', '得力碎纸机', '222.00', '333.00', '/uploads/afdbf7d0-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>外形像一个垃圾桶</p>', '3', '大,中', '2', '2', '1');
INSERT INTO `goods` VALUES ('12', '7', '17', '不知名的耳机', '100.00', '120.00', '/uploads/c7d5a9d0-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>音质不咋地</p>', '4', '白', '1', '1', '1');
INSERT INTO `goods` VALUES ('13', '7', '18', '山寨小米数据线', '9.90', '10.00', '/uploads/e79b0e40-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>不是正品 假的</p>', '4', '白', '2', '2', '1');
INSERT INTO `goods` VALUES ('14', '7', '18', '卖不出去的数据线', '5.00', '6.00', '/uploads/ff90efb0-a34d-11eb-9e8a-dbc87df5adbe.jpg', '<p>地摊上卖不出去了</p>', '4', '黑', '2', '2', '1');

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL COMMENT '用户编号',
  `phone` char(11) NOT NULL COMMENT '手机号',
  `nickname` varchar(50) NOT NULL COMMENT '昵称',
  `password` char(32) NOT NULL COMMENT '密码',
  `randstr` char(5) NOT NULL COMMENT '密码随机串',
  `addtime` char(13) NOT NULL COMMENT '注册时间',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='会员表';

-- ----------------------------
-- Records of member
-- ----------------------------

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '菜单编号',
  `pid` smallint(6) NOT NULL COMMENT '上级菜单编号',
  `title` varchar(50) NOT NULL COMMENT '菜单名称',
  `icon` varchar(100) NOT NULL COMMENT '菜单图标',
  `type` tinyint(1) NOT NULL COMMENT '菜单类型1目录2菜单',
  `url` varchar(100) NOT NULL COMMENT '菜单地址',
  `status` tinyint(1) NOT NULL COMMENT '菜单状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='后台菜单权限表';

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('11', '0', '系统管理', 'el-icon-s-tools', '1', '', '1');
INSERT INTO `menu` VALUES ('12', '0', '商城管理', 'el-icon-setting', '1', '', '1');
INSERT INTO `menu` VALUES ('13', '11', '菜单管理', '', '2', '/menu', '1');
INSERT INTO `menu` VALUES ('14', '11', '角色管理', '', '2', '/role', '1');
INSERT INTO `menu` VALUES ('15', '11', '管理员管理', '', '2', '/manger', '1');
INSERT INTO `menu` VALUES ('21', '12', '商品分类管理', '', '2', '/cate', '1');
INSERT INTO `menu` VALUES ('22', '12', '商品规格管理', '', '2', '/specs', '1');
INSERT INTO `menu` VALUES ('23', '12', '轮播图管理', '', '2', '/banner', '1');
INSERT INTO `menu` VALUES ('24', '12', '商品管理', '', '2', '/goods', '1');
INSERT INTO `menu` VALUES ('25', '12', '会员管理', '', '2', '/member', '1');
INSERT INTO `menu` VALUES ('26', '12', '秒杀管理', '', '2', '/seck', '1');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '角色编号',
  `rolename` varchar(100) NOT NULL COMMENT '角色名称',
  `menus` varchar(255) NOT NULL COMMENT '菜单权限 存放的是菜单编号，用逗号隔开',
  `status` tinyint(1) NOT NULL COMMENT '角色状态1正常2禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='后台用户角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('6', '超级管理员', '[11,13,14,15,12,21,22,23,24,25,26]', '1');
INSERT INTO `role` VALUES ('7', '普通管理员', '[13,12,19,20]', '1');
INSERT INTO `role` VALUES ('8', '员工', '[12,19,20]', '1');

-- ----------------------------
-- Table structure for seckill
-- ----------------------------
DROP TABLE IF EXISTS `seckill`;
CREATE TABLE `seckill` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '秒杀表id',
  `title` varchar(100) NOT NULL COMMENT '活动名称',
  `begintime` char(13) NOT NULL COMMENT '秒杀开始时间',
  `endtime` char(13) NOT NULL COMMENT '秒杀结束时间',
  `first_cateid` smallint(5) NOT NULL COMMENT '商品一级分类编号',
  `second_cateid` smallint(5) NOT NULL COMMENT '商品二级分类编号',
  `goodsid` int(11) NOT NULL COMMENT '商品编号',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='限时秒杀活动表';

-- ----------------------------
-- Records of seckill
-- ----------------------------
INSERT INTO `seckill` VALUES ('1', '商城倒闭大甩卖', '1619107200000', '1685462400000', '4', '9', '1', '1');

-- ----------------------------
-- Table structure for specs
-- ----------------------------
DROP TABLE IF EXISTS `specs`;
CREATE TABLE `specs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '规格id',
  `specsname` varchar(50) NOT NULL COMMENT '规格名称',
  `status` tinyint(1) NOT NULL COMMENT '规格状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品规格表';

-- ----------------------------
-- Records of specs
-- ----------------------------
INSERT INTO `specs` VALUES ('3', '型号', '1');
INSERT INTO `specs` VALUES ('4', '颜色', '1');

-- ----------------------------
-- Table structure for specs_attr
-- ----------------------------
DROP TABLE IF EXISTS `specs_attr`;
CREATE TABLE `specs_attr` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '规格项编号',
  `specsid` int(11) NOT NULL COMMENT '规格的specsid',
  `specsval` varchar(50) NOT NULL COMMENT '规格值',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='商品规格明细表';

-- ----------------------------
-- Records of specs_attr
-- ----------------------------
INSERT INTO `specs_attr` VALUES ('9', '3', '大');
INSERT INTO `specs_attr` VALUES ('10', '3', '中');
INSERT INTO `specs_attr` VALUES ('11', '3', '小');
INSERT INTO `specs_attr` VALUES ('12', '4', '黑');
INSERT INTO `specs_attr` VALUES ('13', '4', '白');
INSERT INTO `specs_attr` VALUES ('14', '4', '灰');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '住建',
  `uid` varchar(50) NOT NULL COMMENT '管理员编号',
  `roleid` smallint(5) NOT NULL COMMENT '角色编号',
  `username` varchar(30) NOT NULL COMMENT '用户名',
  `password` char(32) NOT NULL COMMENT '密码',
  `randstr` char(5) NOT NULL COMMENT '随机加密串',
  `status` tinyint(1) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uid` (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='后台管理员用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('3', '04b07370-a115-11eb-a76d-e386af8648a5', '6', 'admin', 'cef0b5548c2190bd7f48dc1a9ed51ad3', '5taRu', '1');
INSERT INTO `user` VALUES ('4', '2f169d70-a240-11eb-ad77-1725d407e28c', '7', '张三', 'ba056c9fef3bf3e9b14a2a391db9d155', '9SOwc', '1');
