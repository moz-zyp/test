-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2019 年 04 月 14 日 04:40
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `armani`
--

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `sex` varchar(2) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tel` int(11) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uid`, `sex`, `password`, `name`, `email`, `tel`) VALUES
(21, '女士', '741852963', '案件', '5616@qq.com', 2147483647),
(20, '女士', '123456', '张里', '90601295@qq.com', 2147483647),
(19, '女士', '123456', '赵一', '1325253@qq.com', 2147483647),
(18, '女士', '123456', '赵一', '15253@qq.com', 2147483647),
(17, '男', '123456', '赵', '2842701@qq.com', 2147483647),
(16, '男', '123456', '赵', '284270101@qq.com', 2147483647),
(15, '男', '123456', '赵', '2842701011@qq.com', 2147483647),
(14, '男', '123456', '赵', '906012952@qq.com', 2147483647),
(22, '女士', '123456', '设计师', '156@qq.com', 2147483647),
(23, '女士', '123456', '张里', '15253@qq.co', 2147483647),
(24, '女士', '12345678', '李四', '4816@qq.com', 2147483647),
(25, '女士', '852147963', '李四', '906012952@qq.co', 2147483647),
(26, '女士', '789456123', '士大夫', '8152@qq.com', 2147483647),
(27, '女士', 'dltsfxb88', '张三', '123@qq.com', 2147483647);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
