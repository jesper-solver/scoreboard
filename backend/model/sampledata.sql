-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: scoreboard
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'Röd','FE2525'),(2,'Grön','13D341'),(3,'Blå','1098EB'),(4,'Lila','E410EB'),(5,'Gul','FAF31A'),(6,'Svart','050505'),(7,'Orange','F0820E'),(8,'Rosa','F628A5'),(9,'Vit','FAFAFA');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comp_class`
--

LOCK TABLES `comp_class` WRITE;
/*!40000 ALTER TABLE `comp_class` DISABLE KEYS */;
INSERT INTO `comp_class` VALUES (1,1,'Herr',NULL,'2019-02-08 16:30:00','2019-02-08 19:00:00'),(2,1,'Dam',NULL,'2019-02-08 16:30:00','2019-02-08 19:00:00'),(3,1,'Junior',NULL,'2019-02-08 15:30:00','2019-02-08 18:00:00');
/*!40000 ALTER TABLE `comp_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contender`
--

LOCK TABLES `contender` WRITE;
/*!40000 ALTER TABLE `contender` DISABLE KEYS */;
INSERT INTO `contender` VALUES (1,1,'7EIQ-72IU','Chris Sharma',1,'2019-02-08 16:30:00');
/*!40000 ALTER TABLE `contender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contest`
--

LOCK TABLES `contest` WRITE;
/*!40000 ALTER TABLE `contest` DISABLE KEYS */;
INSERT INTO `contest` VALUES (1,1,'Pyramiden Giga Boulder','En cup som arrangeras av Klätterpyramiden.',1,10,NULL);
/*!40000 ALTER TABLE `contest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Klätterpyramiden','11.72825','57.68269');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `organizer`
--

LOCK TABLES `organizer` WRITE;
/*!40000 ALTER TABLE `organizer` DISABLE KEYS */;
INSERT INTO `organizer` VALUES (1,'Klätterpyramiden AB','klätterpyramiden.se');
/*!40000 ALTER TABLE `organizer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `problem`
--

LOCK TABLES `problem` WRITE;
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
INSERT INTO `problem` VALUES (1,1,1,2,100,NULL),(2,1,2,1,200,NULL),(3,1,3,7,50,NULL),(4,1,4,7,50,NULL),(5,1,5,7,150,NULL),(6,1,6,2,100,50),(7,1,7,7,200,NULL),(8,1,8,3,100,NULL),(9,1,9,1,200,NULL),(10,1,10,3,50,NULL),(11,1,11,4,150,NULL),(12,1,12,1,50,NULL),(13,1,13,8,100,NULL),(14,1,14,6,250,NULL),(15,1,15,3,150,150),(16,1,16,3,150,NULL),(17,1,17,8,150,NULL),(18,1,18,5,100,NULL),(19,1,19,8,150,NULL),(20,1,20,7,100,NULL),(21,1,21,4,50,NULL),(22,1,22,4,50,NULL),(23,1,23,8,100,NULL),(24,1,24,3,200,NULL),(25,1,25,6,100,NULL),(26,1,26,3,150,NULL),(27,1,27,4,250,NULL),(28,1,28,4,150,NULL),(29,1,29,5,50,NULL),(30,1,30,5,50,NULL),(31,1,31,2,50,NULL),(32,1,32,8,50,NULL),(33,1,33,9,100,NULL),(34,1,34,3,100,NULL),(35,1,35,4,50,NULL),(36,1,36,3,50,NULL),(37,1,37,1,200,NULL),(38,1,38,5,150,NULL),(39,1,39,3,100,NULL),(40,1,40,7,50,NULL);
/*!40000 ALTER TABLE `problem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tick`
--

LOCK TABLES `tick` WRITE;
/*!40000 ALTER TABLE `tick` DISABLE KEYS */;
INSERT INTO `tick` VALUES (1,1,1,0,'2019-02-08 16:45:00'),(2,1,15,1,'2019-02-08 16:50:00'),(3,1,20,0,'2019-02-08 16:55:00');
/*!40000 ALTER TABLE `tick` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John Doe','john.doe@example.org','$2y$12$C.YrF8dZAglpevXBM3UHce.QD5b0IQXCT24oIZoPtTVRI.IW1LkUG');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_organizer`
--

LOCK TABLES `user_organizer` WRITE;
/*!40000 ALTER TABLE `user_organizer` DISABLE KEYS */;
INSERT INTO `user_organizer` VALUES (1,1);
/*!40000 ALTER TABLE `user_organizer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-28 17:56:42
