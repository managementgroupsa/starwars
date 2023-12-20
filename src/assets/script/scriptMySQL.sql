CREATE DATABASE  IF NOT EXISTS `starwars` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `starwars`;

-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: pruebastarwars.clcfiztqrjny.us-east-2.rds.amazonaws.com    Database: starwars
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `especies`
--

DROP TABLE IF EXISTS `especies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especies` (
  `id` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `clasificacion` varchar(20) DEFAULT NULL,
  `designacion` varchar(20) DEFAULT NULL,
  `promedio_altura` varchar(10) DEFAULT NULL,
  `promedio_tiempovida` varchar(5) DEFAULT NULL,
  `color_ojos` varchar(40) DEFAULT NULL,
  `color_cabello` varchar(40) DEFAULT NULL,
  `color_piel` varchar(10) DEFAULT NULL,
  `lenguaje` varchar(50) DEFAULT NULL,
  `mundonatal` varchar(50) DEFAULT NULL,
  `gente` int DEFAULT NULL,
  `pelicula` int DEFAULT NULL,
  `url` varchar(50) DEFAULT NULL,
  `creado` datetime DEFAULT NULL,
  `editado` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especies`
--

LOCK TABLES `especies` WRITE;
/*!40000 ALTER TABLE `especies` DISABLE KEYS */;
INSERT INTO `especies` VALUES (0,'Human','mammak','sentient','180','120','brown, blue, green, hazel, grey, amber','blonde, brown, black, red','caucasian,','Galactic Basic','https://swapi.py4e.com/api/planets/9/',0,0,'https://swapi.py4e.com/api/species/1/','0000-00-00 00:00:00','2023-12-07 00:00:00'),(1,'Homer','summak','sentient','160','110','brown, blue, green, hazel, grey, amber','blonde, brown, black, red','caucasian,','Galactic Basic','https://swapi.py4e.com/api/planets/8/',0,0,'https://swapi.py4e.com/api/species/2/','0000-00-00 00:00:00','2023-12-07 00:00:00'),(2,'Miguel aNGEL','Humano','Developer','1.75','90','marron','negro','criollo','español , ingles','tierra',0,0,'https://www.linkedin.com/in/miguellopezs/',NULL,NULL),(3,'Miguel','Humano','Developer','1.75','90','marron','negro','criollo','español , ingles','tierra',0,0,'https://www.linkedin.com/in/miguellopezs/',NULL,NULL),(4,'Miguel lOPEZ SANABRIA','Humano','Developer','1.75','90','marron','negro','criollo','español , ingles','tierra',0,0,'https://www.linkedin.com/in/miguellopezs/',NULL,NULL);
/*!40000 ALTER TABLE `especies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculas` (
  `id` int NOT NULL,
  `titulo` varchar(50) DEFAULT NULL,
  `id_episodio` int DEFAULT NULL,
  `apertura` varchar(45) DEFAULT NULL,
  `director` varchar(50) DEFAULT NULL,
  `produccion` varchar(50) DEFAULT NULL,
  `fecha_realizacion` datetime DEFAULT NULL,
  `especies` varchar(100) DEFAULT NULL,
  `estelares` varchar(100) DEFAULT NULL,
  `vehiculos` varchar(100) DEFAULT NULL,
  `caracteres` varchar(100) DEFAULT NULL,
  `planetas` varchar(100) DEFAULT NULL,
  `url` varchar(45) DEFAULT NULL,
  `creado` datetime DEFAULT NULL,
  `editado` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculas`
--

LOCK TABLES `peliculas` WRITE;
/*!40000 ALTER TABLE `peliculas` DISABLE KEYS */;
INSERT INTO `peliculas` VALUES (1,'A New Hope',4,'It is a period of civil war.\\r\\nRebel spacesh','George Lucas','Gary Kurtz, Rick McCallum','1977-05-25 00:00:00','https://swapi.py4e.com/api/species/1/','https://swapi.py4e.com/api/starships/2/','https://swapi.py4e.com/api/vehicles/4/','https://swapi.py4e.com/api/people/1/','https://swapi.py4e.com/api/planets/1/','https://swapi.py4e.com/api/films/1/','2014-12-10 14:23:32','2014-12-20 19:49:45'),(2,'A New Home',4,'It is a period of civil war.\r\nRebel spacesh','George Lucas','Gary Kurtz, Rick McCallum','1977-05-25 00:00:00','https://swapi.py4e.com/api/species/1/','https://swapi.py4e.com/api/starships/2/','https://swapi.py4e.com/api/vehicles/4/','https://swapi.py4e.com/api/people/1/','https://swapi.py4e.com/api/planets/1/','https://swapi.py4e.com/api/films/1/','2014-12-10 14:23:32','2014-12-20 19:49:45');
/*!40000 ALTER TABLE `peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'starwars'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_especies` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `sp_especies`(
IN p_accion varchar(20) ,
IN p_id int,
IN p_nombre varchar(100) ,
IN p_clasificacion varchar(20) ,
IN p_designacion varchar(20) ,
IN p_promedio_altura varchar(10) ,
IN p_promedio_tiempovida varchar(5) ,
IN p_color_ojos varchar(40) ,
IN p_color_cabello varchar(40) ,
IN p_color_piel varchar(10) ,
IN p_lenguaje varchar(50) ,
IN p_mundonatal varchar(50) ,
IN p_gente int ,
IN p_pelicula int ,
IN p_url varchar(50) ,
IN p_creado datetime ,
IN p_editado datetime
)
begin

set @id  = COALESCE(p_id, 0);
set @accion  = COALESCE(p_accion, '');
set @nombre  = COALESCE(p_nombre, '');
set @clasificacion  = COALESCE(p_clasificacion, '');
set @designacion  = COALESCE(p_designacion, '');
set @promedio_altura  = COALESCE(p_promedio_altura, '');
set @promedio_tiempovida  = COALESCE(p_promedio_tiempovida, '');
set @color_ojos  = COALESCE(p_color_ojos, '');
set @color_cabello  = COALESCE(p_color_cabello, '');
set @color_piel  = COALESCE(p_color_piel, '');
set @lenguaje  = COALESCE(p_lenguaje, '');
set @mundonatal  = COALESCE(p_mundonatal, '');
set @gente = COALESCE(p_gente, '');
set @pelicula  = COALESCE(p_pelicula, '');
set @url  = COALESCE(p_url, '');
set @creado  = COALESCE(p_creado, null);
set @editado  = COALESCE(p_editado, null);


if @accion ='BUSCARTODOS' THEN
	SELECT id,nombre ,clasificacion ,designacion ,promedio_altura ,promedio_tiempovida ,color_ojos ,color_cabello ,color_piel ,lenguaje ,mundonatal ,gente ,pelicula ,url ,creado ,editado 
    FROM especies;
END IF;

if @accion ='BUSCARREGISTRO' THEN
	SELECT id,nombre ,clasificacion ,designacion ,promedio_altura ,promedio_tiempovida ,color_ojos ,color_cabello ,color_piel ,lenguaje ,mundonatal ,gente ,pelicula ,url ,creado ,editado 
    FROM especies where nombre LIKE CONCAT('%', @nombre, '%');
END IF;

if @accion ='ELIMINAR' THEN
	delete FROM especies where id =@id;
END IF;

if @accion ='EDITAR' THEN
	UPDATE especies
    SET nombre =@nombre,
		clasificacion  =@clasificacion,
		designacion  =@designacion,
		promedio_altura  =@promedio_altura,
		promedio_tiempovida  =@promedio_tiempovida,
		color_ojos  =@color_ojos,
		color_cabello  =@color_cabello,
		color_piel  =@color_piel,
		lenguaje  =@lenguaje,
		mundonatal  =@mundonatal,
		gente  =@gente,
		pelicula  =@pelicula,
		url  =@url,
		creado  =@creado,
		editado  =@editado
    WHERE id = @id;
    
    
END IF;

if @accion ='INSERTAR' THEN

   
		INSERT INTO especies (id ,nombre ,clasificacion ,designacion ,promedio_altura ,promedio_tiempovida ,color_ojos ,color_cabello ,color_piel ,lenguaje ,mundonatal ,gente ,pelicula ,url ,creado ,editado )
		VALUES(@id, @nombre ,@clasificacion ,@designacion ,@promedio_altura ,@promedio_tiempovida ,@color_ojos ,@color_cabello ,@color_piel ,@lenguaje ,@mundonatal ,@gente ,@pelicula ,@url ,@creado ,@editado);

        
 
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_peliculas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `sp_peliculas`(
IN p_accion varchar(20) ,
IN p_id int,
IN p_titulo varchar(45) ,
IN p_id_episodio int ,
IN p_apertura varchar(45) ,
IN p_director varchar(50) ,
IN p_produccion varchar(50) ,
IN p_fecha_realizacion datetime ,
IN p_especies varchar(100) ,
IN p_estelares varchar(100) ,
IN p_vehiculos varchar(100) ,
IN p_caracteres varchar(100) ,
IN p_planetas varchar(100) ,
IN p_url varchar(45) ,
IN p_creado datetime ,
IN p_editado datetime

)
begin

set @id = COALESCE(p_id, 0);
set @accion  = COALESCE(p_accion, '');
set @titulo = COALESCE(p_titulo, '');
set @id_episodio = COALESCE(p_id_episodio, '');
set @apertura = COALESCE(p_apertura, '');
set @director = COALESCE(p_director, '');
set @produccion = COALESCE(p_produccion, '');
set @fecha_realizacion = COALESCE(p_fecha_realizacion, null);
set @especies = COALESCE(p_especies, '');
set @estelares = COALESCE(p_estelares, '');
set @vehiculos = COALESCE(p_vehiculos, '');
set @caracteres = COALESCE(p_caracteres, '');
set @planetas = COALESCE(p_planetas, '');
set @url = COALESCE(p_url, '');
set @creado = COALESCE(p_creado, null);
set @editado = COALESCE(p_editado, null);

if @accion ='BUSCARTODOS' THEN
	SELECT id, titulo, id_episodio , apertura , director , produccion , fecha_realizacion , especies , estelares , vehiculos , caracteres , planetas , url , creado , editado 
    FROM peliculas;
END IF;

if @accion ='BUSCARREGISTRO' THEN
	SELECT id, titulo, id_episodio , apertura , director , produccion , fecha_realizacion , especies , estelares , vehiculos , caracteres , planetas , url , creado , editado 
    FROM peliculas where titulo LIKE CONCAT('%', @titulo, '%');
END IF;

if @accion ='ELIMINAR' THEN
	delete FROM peliculas where id =@id ;
END IF;

if @accion ='EDITAR' THEN
	UPDATE peliculas
    SET titulo=@titulo, 
    id_episodio =@id_episodio , 
    apertura=@apertura , 
    director=@director , 
    produccion=@produccion , 
    fecha_realizacion =@fecha_realizacion , 
    especies=@especies , 
    estelares =@estelares , 
    vehiculos=@vehiculos , 
    caracteres =@caracteres , 
    planetas=@planetas , 
    url=@url , 
    creado =@creado , 
    editado =@editado 
    WHERE id = @id;
    
    
END IF;

if @accion ='INSERTAR' THEN

   
		INSERT INTO peliculas (id, titulo, id_episodio , apertura , director , produccion , fecha_realizacion , especies , estelares , vehiculos , caracteres , planetas , url , creado , editado  )
		VALUES(@id, @titulo, @id_episodio , @apertura , @director , @produccion , @fecha_realizacion , @especies , @estelares , @vehiculos , @caracteres , @planetas , @url , @creado , @editado );

        
 
END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-08 16:22:54
