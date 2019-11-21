-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 08, 2017 at 04:04 PM
-- Server version: 5.5.54
-- PHP Version: 5.4.45-4+deprecated+dontuse+deb.sury.org~precise+1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ionic`
--

-- --------------------------------------------------------

--
-- Table structure for table `feed`
--

CREATE TABLE IF NOT EXISTS `feed` (
  `feed_id` int(11) NOT NULL AUTO_INCREMENT,
  `feed` text,
  `user_id_fk` int(11) DEFAULT NULL,
  PRIMARY KEY (`feed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `technologies`
--

CREATE TABLE IF NOT EXISTS `technologies` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `jenis_barang` enum('Hardware','Software') DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `jumlah` int(10) DEFAULT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Dumping data for table `technologies`
--

INSERT INTO `technologies` (`id`, `nama`, `jenis_barang`, `detail`, `jumlah`, `lokasi`, `status`, `timestamp`) VALUES
(25, 'ase', 'Hardware', 'ase', 23, 'ase', 'ase', '2017-09-05 07:31:30'),
(26, 'dsa', 'Hardware', 'das', 22, 'dsa', 'dsa', '2017-09-05 07:32:12'),
(27, 'ek', 'Hardware', 'ek', 3, 'ek', 'ek', '2017-09-05 09:07:42'),
(28, 'AS', 'Software', 'as', 3, 'as', 'Jual', '2017-09-05 09:21:26'),
(32, 'sadasdas', 'Hardware', 'asdasdasd', 4, 'dsfdfs', 'Hibah', '2017-09-07 07:50:31'),
(34, 'Aris', 'Hardware', 'asdasdasd', 4, 'dsfdfs', 'Hibah', '2017-09-07 08:18:17'),
(35, 'Agus', 'Hardware', 'asdasdasd', 4, 'dsfdfs', 'Hibah', '2017-09-07 08:18:30');

-- --------------------------------------------------------

--
-- Table structure for table `updates`
--

CREATE TABLE IF NOT EXISTS `updates` (
  `update_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_update` text,
  `user_id_fk` int(11) DEFAULT NULL,
  `created` int(11) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`update_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `name`, `email`) VALUES
(2, 'asek4ever', '2e213e5faeb331713c6380565371415424f8d304b0bd6454f29a0d8fe6a6b349', 'agus setyawan', 'as@as.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
