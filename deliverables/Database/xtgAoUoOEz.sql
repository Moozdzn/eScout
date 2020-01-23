-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 23, 2020 at 04:29 PM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xtgAoUoOEz`
--

-- --------------------------------------------------------

--
-- Table structure for table `AttendeeType`
--

CREATE TABLE `AttendeeType` (
  `userID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `type` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Comment`
--

CREATE TABLE `Comment` (
  `videoID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `commentID` int(11) NOT NULL,
  `comment` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Event`
--

CREATE TABLE `Event` (
  `eventID` int(11) NOT NULL,
  `eventName` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `eventGame` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `eventDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `eventStartTime` timestamp NOT NULL,
  `eventTicketPrice` float NOT NULL,
  `locationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Event`
--

INSERT INTO `Event` (`eventID`, `eventName`, `eventGame`, `eventDescription`, `eventStartTime`, `eventTicketPrice`, `locationID`) VALUES
(14, 'PUBG MASTER', 'PUBG', 'PUBG master supported by ROG', '2020-06-05 10:10:00', 15, 5),
(15, 'CS:GO MASTERS', 'CSGO', 'CS:GO with the best rank teams in the world', '2020-04-06 11:00:00', 30, 6),
(16, 'League of Legends Showdown', 'LOL', 'Come watch the best players fight for the Showdown Title', '2020-08-04 15:00:00', 15, 8),
(17, 'PUBG by RedBull', 'PUBG', 'Vêm ao espaço da RedBull assistir a livestream das jornadas de PUBG', '2020-07-06 21:00:00', 0, 9),
(19, 'teste', 'CSGO', 'descriçao', '2020-02-02 10:00:00', 30, 18),
(24, 'CS:GO teste', 'CSGO', 'FESTA DO CSGO', '2020-10-05 15:02:00', 500, 39);

-- --------------------------------------------------------

--
-- Table structure for table `EventLocation`
--

CREATE TABLE `EventLocation` (
  `locationID` int(11) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `eventlocationName` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `EventLocation`
--

INSERT INTO `EventLocation` (`locationID`, `latitude`, `longitude`, `eventlocationName`) VALUES
(5, 38.7685, -9.09387, 'Altice Arena, Rossio dos Olivais, Parque das Nações, Lisbon, Grande Lisboa, Área Metropolitana de Lisboa, 1990, Portugal'),
(6, 38.7075, -9.13544, 'Terreiro do Paço, Praça do Comércio, Madalena, Chiado, Santa Maria Maior, Lisbon, Grande Lisboa, Área Metropolitana de Lisboa, 1149-027, Portugal'),
(8, 38.7546, -9.18885, 'Centro Comercial Colombo, Avenida Lusíada, Carnide, Lisbon, Grande Lisboa, Área Metropolitana de Lisboa, 1500-392, Portugal'),
(9, 38.707, -9.1457, 'Mercado da Ribeira, 50, Avenida 24 de Julho, São Paulo, São Bento, Misericórdia, Lisbon, Grande Lisboa, Área Metropolitana de Lisboa, 1200 – 427, Portugal'),
(10, -34.9046, -56.1988, 'IADE, 832, Mercedes, Centro, Montevidéu, Montevideo, 11100, Uruguai'),
(11, -34.9046, -56.1988, 'IADE, 832, Mercedes, Centro, Montevidéu, Montevideo, 11100, Uruguai'),
(12, -34.9046, -56.1988, 'IADE, 832, Mercedes, Centro, Montevidéu, Montevideo, 11100, Uruguai'),
(13, -34.9046, -56.1988, 'IADE, 832, Mercedes, Centro, Montevidéu, Montevideo, 11100, Uruguai'),
(14, -34.9046, -56.1988, 'IADE, 832, Mercedes, Centro, Montevidéu, Montevideo, 11100, Uruguai'),
(15, -34.9046, -56.1988, 'IADE, 832, Mercedes, Centro, Montevidéu, Montevideo, 11100, Uruguai'),
(16, -34.9046, -56.1988, 'IADE, 832, Mercedes, Centro, Montevidéu, Montevideo, 11100, Uruguai'),
(17, -34.9046, -56.1988, 'IADE, 832, Mercedes, Centro, Montevidéu, Montevideo, 11100, Uruguai'),
(18, 38.7085, -9.13686, 'Rua Augusta, Baixa, Santa Maria Maior, Lisbon, Grande Lisboa, Área Metropolitana de Lisboa, 1100-150, Portugal'),
(19, -34.9046, -56.1988, 'IADE, 832, Mercedes, Centro, Montevidéu, Montevideo, 11100, Uruguai'),
(20, 38.7591, -9.13829, 'Avenida do Brasil, São João de Brito, Alvalade, Lisbon, Grande Lisboa, Área Metropolitana de Lisboa, 1700-322 SÃO JOÃO DE BRITO, Portugal'),
(21, 39.7438, -8.80711, NULL),
(22, 39.7438, -8.80711, NULL),
(23, 39.7438, -8.80711, 'Leiria, Pinhal Litoral, Centro, 2400-217 LEIRIA, Portugal'),
(24, 39.7438, -8.80711, 'Leiria, Pinhal Litoral, Centro, 2400-217 LEIRIA, Portugal'),
(25, 39.7438, -8.80711, 'Leiria, Pinhal Litoral, Centro, 2400-217 LEIRIA, Portugal'),
(26, 38.6978, -9.20943, 'Belém, Lisbon, Grande Lisboa, Área Metropolitana de Lisboa, 1400-206, Portugal'),
(27, 40.6575, -7.91387, 'Viseu, Viseu Dão-Lafões, Centro, 3500-168, Portugal'),
(28, 40.211, -8.42921, 'Coimbra, Baixo Mondego, Centro, 3004-007, Portugal'),
(29, 40.211, -8.42921, 'Coimbra, Baixo Mondego, Centro, 3004-007, Portugal'),
(30, 40.211, -8.42921, 'Coimbra, Baixo Mondego, Centro, 3004-007, Portugal'),
(31, 39.7438, -8.80711, 'Leiria, Pinhal Litoral, Centro, 2400-217 LEIRIA, Portugal'),
(32, 39.7438, -8.80711, 'Leiria, Pinhal Litoral, Centro, 2400-217 LEIRIA, Portugal'),
(33, 39.7438, -8.80711, 'Leiria, Pinhal Litoral, Centro, 2400-217 LEIRIA, Portugal'),
(34, 39.7438, -8.80711, 'Leiria, Pinhal Litoral, Centro, 2400-217 LEIRIA, Portugal'),
(35, 39.7438, -8.80711, 'Leiria, Pinhal Litoral, Centro, 2400-217 LEIRIA, Portugal'),
(36, 37.0163, -7.93518, 'Faro, Algarve, Portugal'),
(37, 41.4514, -8.17085, 'Fafe, Braga, Ave, North, Portugal'),
(38, 38.759, -9.23652, 'Amadora, Lisbon, Grande Lisboa, Área Metropolitana de Lisboa, 2700-160, Portugal'),
(39, 38.759, -9.23652, 'Amadora, Lisbon, Grande Lisboa, Área Metropolitana de Lisboa, 2700-160, Portugal');

-- --------------------------------------------------------

--
-- Table structure for table `Message`
--

CREATE TABLE `Message` (
  `messageID` int(11) NOT NULL,
  `messageToID` int(11) NOT NULL,
  `messageFromID` int(11) NOT NULL,
  `message` varchar(280) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `messageDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Message`
--

INSERT INTO `Message` (`messageID`, `messageToID`, `messageFromID`, `message`) VALUES
(1, 5, 6, 'ola,tudo bem'),
(2, 5, 4, 'is it working?'),
(3, 4, 5, 'yes it is'),
(53, 4, 5, 'ola tudo bem'),
(54, 5, 4, 'teste'),
(62, 4, 5, 'hello'),
(79, 5, 4, 'boas chiqui'),
(80, 5, 4, 'como é que mando mensagem para alguem'),
(81, 5, 4, 'nao tenho amigos'),
(83, 4, 5, 'qual é o teu problema?'),
(85, 6, 5, 'esta tudo bem'),
(86, 6, 5, 'a aplicação do manel não vale nada'),
(87, 6, 5, 'mas nao lhe digas'),
(88, 5, 6, 'es bueda bom'),
(89, 6, 5, 'obrigado'),
(90, 4, 6, 'teste'),
(91, 4, 6, 'ola'),
(92, 5, 7, 'teste'),
(93, 4, 4, 'oi'),
(94, 4, 7, 'bom dia'),
(95, 6, 4, 'ola'),
(96, 10, 4, 'Ola joni, gostei dos teus vídeos');

-- --------------------------------------------------------

--
-- Table structure for table `Region`
--

CREATE TABLE `Region` (
  `regionID` int(11) NOT NULL,
  `regionLat` double NOT NULL,
  `regionLong` double NOT NULL,
  `regionName` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Region`
--

INSERT INTO `Region` (`regionID`, `regionLat`, `regionLong`, `regionName`) VALUES
(1, 38.7440523, -9.15182793, 'Lisboa'),
(2, 41.1494512, -8.6107884, 'Porto'),
(3, 41.694867, -8.831088, 'Viana do Castelo'),
(4, 41.5510583, -8.4280045, 'Braga'),
(5, 41.2966556, -7.74678, 'Vila Real'),
(6, 41.8071182, -6.7589839, 'Bragança'),
(7, 40.640496, -8.6537841, 'Aveiro'),
(8, 40.6574713, -7.9138664, 'Viseu'),
(9, 40.5378408, -7.2662964, 'Guarda'),
(10, 40.2109801, -8.4292057, 'Coimbra'),
(11, 41.2773349, -6.755895, 'Castelo Branco'),
(12, 39.7437902, -8.8071119, 'Leiria'),
(13, 39.2363637, -8.6867081, 'Santarém'),
(14, 39.2911347, -7.4333887, 'Portalegre'),
(15, 38.524321, -8.8926172, 'Setúbal'),
(16, 38.5707742, -7.9092808, 'Évora'),
(17, 38.0154479, -7.8650368, 'Beja'),
(18, 37.0162727, -7.9351771, 'Faro');

-- --------------------------------------------------------

--
-- Table structure for table `Team`
--

CREATE TABLE `Team` (
  `teamID` int(11) NOT NULL,
  `teamName` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `teamDescription` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Team`
--

INSERT INTO `Team` (`teamID`, `teamName`, `teamDescription`) VALUES
(0, 'Null', 'Null'),
(1, 'BaeconGG', 'Comunidade Portuguesa'),
(2, 'For the Win', 'pepehands');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `userID` int(11) NOT NULL,
  `username` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `userType` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `birthDate` date NOT NULL,
  `regionID` int(11) NOT NULL,
  `bio` tinytext COLLATE utf8_unicode_ci,
  `game` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `mainPosition` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `teamID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`userID`, `username`, `userType`, `password`, `name`, `birthDate`, `regionID`, `bio`, `game`, `mainPosition`, `teamID`) VALUES
(4, 'mooz', 'Pro', '1234', 'Diogo Santos', '1998-06-05', 1, 'BEST empanado', 'PUBG', 'Support', 1),
(5, 'chiqui', 'Player', '1234', 'Francisco Cordeiro', '1999-12-17', 12, 'omg what', 'PUBG', 'Support', 0),
(6, 'alberto', 'Scout', '1234', 'Alberto Joao Jardim', '1970-05-05', 1, 'ah moçe', 'PUBG', NULL, 2),
(7, 'joaquim', 'EO', '1234', 'Joaquim dos Eventos', '1977-12-08', 6, 'eventos é comigo', NULL, NULL, 0),
(8, 'manel', 'Pro', '1234', 'Poul Kulver', '1985-04-30', 9, 'praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor', 'PUBG', 'Fragger', 1),
(9, 'professor', 'Player', '1234', 'Professor', '1985-08-25', 9, 'platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non', 'LOL', 'Mid', 0),
(10, 'joni', 'Player', '1234', 'Georges Ferson', '2010-08-30', 9, 'duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus', 'CSGO', 'Fragger', 0),
(11, 'jaquelino', 'Player', '1234', 'Ibrahim Hamal', '1972-04-14', 2, 'amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae', 'LOL', 'TOP', 0),
(12, 'amilio', 'Player', '1234', 'Gwyneth Merle', '2013-10-21', 11, 'iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero', 'CSGO', 'Sniper', 0),
(13, 'aaitkenhead6', 'Player', '362', 'Alexandr Aitkenhead', '1988-09-30', 4, 'enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue', 'Fortnite', 'Top', 0),
(14, 'kbarton7', 'Player', '8', 'Kym Barton', '2001-11-04', 7, 'risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse', 'LoL', 'ADC', 0),
(15, 'kwhatman8', 'Player', '1', 'Kesley Whatman', '1996-07-14', 6, 'integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac', 'Fortnite', 'Jungle', 0),
(16, 'ejulyan9', 'Player', '4', 'El Julyan', '1979-08-20', 4, 'mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus', 'PUBG', 'Mid', 0),
(17, 'cbucktrouta', 'Player', '457', 'Carmencita Bucktrout', '1993-10-17', 14, 'mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer', 'CSGO', 'Mid', 0),
(18, 'smelliardb', 'Player', '064', 'Sherry Melliard', '1989-03-19', 15, 'cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat', 'LoL', 'Jungle', 0),
(19, 'asabertonc', 'Player', '53889', 'Arlette Saberton', '1981-09-10', 1, 'fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis', 'CSGO', 'Fragger', 0),
(20, 'elindbladd', 'Player', '4963', 'Evangelia Lindblad', '1976-12-07', 12, 'at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula', 'LoL', 'Jungle', 0),
(21, 'dtitchene', 'Player', '30', 'Dawn Titchen', '1985-11-13', 10, 'amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at', 'PUBG', 'Mid', 0),
(22, 'bginnellyf', 'Player', '9444', 'Barnabas Ginnelly', '1982-01-26', 11, 'nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam', 'LoL', 'Mid', 0),
(23, 'agowngeg', 'Player', '3', 'Alan Gownge', '1977-05-20', 15, 'morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti', 'LoL', 'ADC', 0),
(24, 'ztaylorsonh', 'Player', '485', 'Zerk Taylorson', '2008-09-23', 3, 'fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam', 'CSGO', 'Top', 0),
(25, 'kvincenti', 'Player', '0653', 'Kalle Vincent', '1981-12-24', 17, 'sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis', 'CSGO', 'Top', 0),
(26, 'eteligaj', 'Player', '46904', 'Ellen Teliga', '1974-07-22', 10, 'sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti', 'PUBG', 'Top', 0),
(27, 'sjoirek', 'Player', '750', 'Shandra Joire', '2014-10-10', 12, 'varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac', 'LoL', 'Sniper', 0),
(28, 'vol', 'Player', '38', 'Vanda O\' Liddy', '2010-11-26', 1, 'magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum', 'CSGO', 'Entry', 0),
(29, 'keyckelbeckm', 'Player', '0', 'Karlan Eyckelbeck', '1974-03-21', 7, 'aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet', 'CSGO', 'Mid', 0),
(30, 'cperoccin', 'Player', '7811', 'Corney Perocci', '1975-01-28', 5, 'nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis', 'PUBG', 'Support', 0),
(31, 'bshimwallo', 'Player', '8032', 'Bekki Shimwall', '1990-02-23', 12, 'velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla', 'Fortnite', 'Sniper', 0),
(32, 'fmoncreifp', 'Player', '65922', 'Frankie Moncreif', '2012-12-24', 4, 'dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl', 'PUBG', 'Jungle', 0),
(33, 'lchampneysq', 'Player', '06', 'Lotti Champneys', '1976-12-02', 17, 'quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui', 'Fortnite', 'Top', 0),
(34, 'jgarnamr', 'Player', '94247', 'Jessy Garnam', '2009-02-10', 13, 'id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam', 'LoL', 'Fragger', 0),
(35, 'kmarsies', 'Player', '87492', 'Karlyn Marsie', '1971-09-30', 17, 'mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum', 'PUBG', 'Top', 0),
(36, 'bniblockt', 'Player', '0046', 'Burt Niblock', '1995-03-04', 8, 'ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante', 'Fortnite', 'Mid', 0),
(37, 'fshreenanu', 'Player', '557', 'Fredericka Shreenan', '1992-05-18', 3, 'aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at', 'LoL', 'Jungle', 0),
(38, 'callumv', 'Player', '253', 'Cally Allum', '1980-02-17', 11, 'risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci', 'CSGO', 'ADC', 0),
(39, 'agomanw', 'Player', '076', 'Arlee Goman', '1983-02-27', 9, 'eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet', 'PUBG', 'Fragger', 0),
(40, 'dpeepallx', 'Player', '7153', 'D\'arcy Peepall', '2008-11-06', 10, 'quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem', 'PUBG', 'Jungle', 0),
(41, 'acosgrovey', 'Player', '8012', 'Amata Cosgrove', '2004-12-20', 15, 'eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo', 'Fortnite', 'Entry', 0),
(42, 'mmallisonz', 'Player', '640', 'Matias Mallison', '1991-01-15', 15, 'fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit', 'Fortnite', 'Jungle', 0),
(43, 'mcleyburn10', 'Player', '495', 'Moore Cleyburn', '2004-10-15', 4, 'ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere', 'Fortnite', 'Fragger', 0),
(44, 'samaya11', 'Player', '33', 'Sterling Amaya', '2000-10-26', 15, 'nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in', 'PUBG', 'Support', 0),
(45, 'rtolan12', 'Player', '8771', 'Rik Tolan', '1974-12-29', 1, 'pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in', 'CSGO', 'Jungle', 0),
(46, 'bwest13', 'Player', '2', 'Bruce West', '1979-03-10', 17, 'pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros', 'LoL', 'Top', 0),
(47, 'tredhead14', 'Player', '3487', 'Terrance Redhead', '1996-10-06', 14, 'venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed', 'PUBG', 'ADC', 0),
(48, 'jpiwall15', 'Player', '9846', 'Jennica Piwall', '2017-10-05', 17, 'accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede', 'PUBG', 'Jungle', 0),
(49, 'toduilleain16', 'Player', '3', 'Tarrah O\'Duilleain', '1972-09-23', 12, 'purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut', 'PUBG', 'Top', 0),
(50, 'mhansbury17', 'Player', '30', 'Marianne Hansbury', '1977-04-12', 8, 'sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus', 'Fortnite', 'Mid', 0),
(51, 'kedscer18', 'Player', '18935', 'Katharine Edscer', '1990-12-17', 4, 'orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non', 'Fortnite', 'ADC', 0),
(52, 'eplumbridge19', 'Player', '2', 'Edik Plumbridge', '2015-09-27', 13, 'placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare', 'PUBG', 'Sniper', 0),
(53, 'ttakkos1a', 'Player', '99152', 'Tessa Takkos', '1979-10-14', 13, 'viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat', 'CSGO', 'Support', 0),
(54, 'kbascombe1b', 'Player', '50115', 'Kimberly Bascombe', '1990-03-06', 6, 'ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam', 'LoL', 'Sniper', 0),
(55, 'pbeveridge1c', 'Player', '19163', 'Pen Beveridge', '2016-07-17', 16, 'sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at', 'CSGO', 'Entry', 0),
(56, 'dguilbert1d', 'Player', '181', 'Dollie Guilbert', '1996-08-02', 9, 'quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras', 'PUBG', 'Jungle', 0),
(57, 'tthurgood1e', 'Player', '5182', 'Torr Thurgood', '1984-02-19', 11, 'ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla', 'PUBG', 'ADC', 0),
(58, 'jburling1f', 'Player', '83', 'Jenica Burling', '2004-02-05', 5, 'in congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris vulputate elementum nullam', 'CSGO', 'Sniper', 0),
(59, 'kjozwiak1g', 'Player', '14', 'Kenon Jozwiak', '1984-05-04', 13, 'dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst', 'CSGO', 'Sniper', 0),
(60, 'egeorgeau1h', 'Player', '25600', 'Earvin Georgeau', '2014-08-17', 10, 'erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo', 'PUBG', 'Top', 0),
(61, 'fsteer1i', 'Player', '012', 'Fedora Steer', '1990-11-16', 17, 'sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci', 'CSGO', 'Top', 0),
(62, 'rshave1j', 'Player', '93062', 'Rivkah Shave', '1977-06-23', 11, 'augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi', 'LoL', 'Sniper', 0),
(63, 'rstiling1k', 'Player', '70354', 'Rhiamon Stiling', '1977-12-23', 7, 'dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis', 'PUBG', 'ADC', 0),
(64, 'sjeves1l', 'Player', '42', 'Stanly Jeves', '1987-09-18', 3, 'phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis odio', 'CSGO', 'Fragger', 0),
(65, 'mcleverley1m', 'Player', '662', 'Melina Cleverley', '2007-04-28', 6, 'nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla sed', 'LoL', 'ADC', 0),
(66, 'rbeckwith1n', 'Player', '7', 'Roland Beckwith', '2001-04-16', 12, 'semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices', 'CSGO', 'Mid', 0),
(67, 'mdivers1o', 'Player', '133', 'Merrick Divers', '2003-03-12', 4, 'ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse', 'LoL', 'Jungle', 0),
(68, 'ddarker1p', 'Player', '1801', 'Doe Darker', '2005-12-01', 10, 'rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet', 'CSGO', 'Top', 0),
(69, 'hdietmar1q', 'Player', '91690', 'Hermy Dietmar', '2000-07-08', 17, 'ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis', 'Fortnite', 'Support', 0),
(70, 'mgooderick1r', 'Player', '83', 'Mab Gooderick', '1979-12-22', 14, 'habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo', 'PUBG', 'Top', 0),
(71, 'oburnsides1s', 'Player', '86', 'Ozzie Burnsides', '2015-10-28', 4, 'erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin', 'PUBG', 'Mid', 0),
(72, 'aleeds1t', 'Player', '79', 'Alexio Leeds', '2008-01-24', 16, 'est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam', 'LoL', 'Fragger', 0),
(73, 'sroblett1u', 'Player', '235', 'Stanislas Roblett', '2006-11-08', 7, 'pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate', 'CSGO', 'Mid', 0),
(74, 'astorkes1v', 'Player', '59082', 'Anett Storkes', '2010-01-22', 2, 'curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim', 'PUBG', 'Support', 0),
(75, 'ngilliam1w', 'Player', '1', 'Nicola Gilliam', '1970-07-29', 15, 'massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum', 'PUBG', 'Mid', 0),
(76, 'eleonards1x', 'Player', '5', 'Elliott Leonards', '1985-01-29', 7, 'eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis', 'Fortnite', 'Mid', 0),
(77, 'cdrife1y', 'Player', '56642', 'Corny Drife', '1977-06-17', 13, 'quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt', 'CSGO', 'Top', 0),
(78, 'cpennini1z', 'Player', '50', 'Carilyn Pennini', '1993-03-19', 1, 'donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien', 'CSGO', 'Fragger', 0),
(79, 'hmiddiff20', 'Player', '1271', 'Hilliard Middiff', '1985-11-12', 12, 'et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non', 'CSGO', 'ADC', 0),
(80, 'mmuddicliffe21', 'Player', '8635', 'Matias Muddicliffe', '1996-05-01', 12, 'neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis', 'PUBG', 'Jungle', 0),
(81, 'rlohden22', 'Player', '08136', 'Rebecca Lohden', '2009-04-06', 1, 'proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis', 'PUBG', 'Mid', 0),
(82, 'gpenk23', 'Player', '210', 'Gabriell Penk', '1976-09-14', 6, 'adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat', 'CSGO', 'Top', 0),
(83, 'rscrimshire24', 'Player', '68', 'Rakel Scrimshire', '1996-11-19', 13, 'enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus', 'PUBG', 'ADC', 0),
(84, 'sscoon25', 'Player', '30', 'Stacy Scoon', '1991-01-28', 12, 'fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa', 'Fortnite', 'Entry', 0),
(85, 'everbruggen26', 'Player', '21', 'Elise Verbruggen', '1982-07-24', 13, 'luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce', 'LoL', 'Mid', 0),
(86, 'rdaborn27', 'Player', '3980', 'Ruttger Daborn', '2007-09-15', 8, 'velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros', 'LoL', 'Mid', 0),
(87, 'zcopello28', 'Player', '89', 'Zena Copello', '2013-04-02', 10, 'porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc', 'PUBG', 'Entry', 0),
(88, 'ogilligan29', 'Player', '12', 'Olivero Gilligan', '1984-05-24', 8, 'non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue', 'LoL', 'ADC', 0),
(89, 'salcott2a', 'Player', '465', 'Sheffy Alcott', '1998-10-22', 15, 'ipsum dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum', 'CSGO', 'Mid', 0),
(90, 'rlyle2b', 'Player', '21735', 'Roze Lyle', '1993-02-22', 8, 'nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla nunc purus', 'LoL', 'Top', 0),
(91, 'agorini2c', 'Player', '4', 'Alfi Gorini', '2005-08-21', 7, 'parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus', 'LoL', 'Top', 0),
(92, 'cbarstowk2d', 'Player', '9', 'Costa Barstowk', '1988-07-12', 5, 'tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas', 'Fortnite', 'ADC', 0),
(93, 'cmenaul2e', 'Player', '36', 'Cicely Menaul', '1999-11-21', 13, 'urna ut tellus nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel', 'LoL', 'Fragger', 0),
(94, 'ddeverell2f', 'Player', '52', 'Dill Deverell', '2007-07-18', 17, 'ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus', 'CSGO', 'Sniper', 0),
(95, 'mbauer2g', 'Player', '641', 'Missy Bauer', '1987-10-21', 16, 'non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum', 'CSGO', 'Mid', 0),
(96, 'ctinston2h', 'Player', '3', 'Claudius Tinston', '1990-06-01', 16, 'a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat', 'CSGO', 'Support', 0),
(97, 'operon2i', 'Player', '65', 'Osbert Peron', '2005-10-23', 8, 'a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec', 'CSGO', 'ADC', 0),
(98, 'scheale2j', 'Player', '567', 'Sanson Cheale', '1982-06-02', 14, 'elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris', 'PUBG', 'Top', 0),
(99, 'bsapson2k', 'Player', '8684', 'Bianca Sapson', '2012-05-13', 4, 'fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu', 'LoL', 'Top', 0),
(100, 'wsparks2l', 'Player', '3464', 'Willy Sparks', '2011-04-04', 12, 'pellentesque eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum', 'PUBG', 'Support', 0),
(101, 'rfitzjohn2m', 'Player', '11', 'Ruperto Fitzjohn', '1979-04-01', 10, 'turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in', 'LoL', 'Fragger', 0),
(102, 'cfuchs2n', 'Player', '511', 'Charil Fuchs', '2007-02-23', 8, 'non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus', 'CSGO', 'ADC', 0),
(103, 'bkitley2o', 'Player', '8', 'Binny Kitley', '1996-11-13', 10, 'libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus', 'LoL', 'ADC', 0),
(104, 'eoscollain2p', 'Player', '752', 'Emmalee O\'Scollain', '1994-11-09', 14, 'in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit', 'LoL', 'Mid', 0),
(105, 'ocoulthart2q', 'Player', '1', 'Otis Coulthart', '1976-11-13', 15, 'accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum', 'LoL', 'ADC', 0),
(106, 'tfant2r', 'Player', '523', 'Tallie Fant', '1993-10-31', 14, 'nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel', 'PUBG', 'Support', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Video`
--

CREATE TABLE `Video` (
  `videoID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `videoTitle` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `videoDescription` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `uploadDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `game` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `rating` int(11) DEFAULT '1',
  `reference` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `views` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Video`
--

INSERT INTO `Video` (`videoID`, `userID`, `videoTitle`, `videoDescription`, `game`, `rating`, `reference`, `views`) VALUES
(42, 4, 'Squad wipe', 'Hello this is my second video please share with your friends', 'PUBG', 15, '1dR8MQE1GMrt7qXKw3YeBDDU7Wsy0HEDE', 1),
(43, 4, 'AFK Chicken Dinner', 'He was over the bridge and couldn\'t kill me LOL.', 'PUBG', 2, '1oSTHoc1Ddfo5Ad32TCQrIYWNyDjwcJR7', 1),
(44, 10, 'My first highligh', 'Hello guys, please rate my video. ', 'CSGO', 1, '1YF8i2yHHKTn2s2mH8-9x8k3sI_UTlPG2', 1),
(45, 4, 'Chicken Dinner', '5 kills!!', 'PUBG', 4, '1aCdjeb9Xqj_3hXSibo2I5Apnt-GyO9Xl', 1),
(46, 4, 'My First Play', 'I hope you enjoy.', 'PUBG', 2, '1UqpIEzYIKv-0_aJiRGx8n0e1oOzr9kU2', 1),
(47, 10, 'Dust 2 awp', 'Carring with AWP, mvp. ', 'CSGO', 9, '10MQN3M3kp6WuBnEaRVKWICD5lXFROhV-', 1),
(48, 10, 'Triple Humiliation', 'I knived 3 guys!!', 'CSGO', 2, '1M6NysxmbrCsEbTth5CqnBoahDKxDOu_z', 1),
(49, 12, 'Mirage plays', 'Some kills in Mirage', 'CSGO', 2, '1-ZluTdBhnbTTzUGI6TdN72_D3rMG84-7', 1),
(50, 12, 'My mix', 'Hope you guys enjoy!', 'CSGO', 1, '1DElaP7oJc4MOlBPMDjhjpwCDGvuxX9OM', 1),
(51, 9, 'Mid lane', 'my first highlight', 'LOL', 1, '1FGMIt5f3juVFXDjt5g5Bh0ozY6Ld8JZU', 1),
(52, 9, 'Main Irelia btw', 'hope you like my irelia skills', 'LOL', 1, '1wAHqH0oc20sXZTwKmcYcUBidhtO9yn-x', 1),
(53, 11, 'Vlad 1v1', 'vlad versus cho', 'LOL', 1, '1MMd9N7cFDPjNnJk3d8D_nvNYAxGvLWYD', 1),
(54, 11, 'Blind hook', 'My best hook pls upvote!', 'LOL', 7, '1BrZkHll0gTrXt1K71vbHdxkhzm4TPRMn', 1),
(55, 11, 'ANOTHER HOOK', 'here I am again, with another AMAZING HOOK pls upvote', 'LOL', 2, '1brqBFQR2C0DoE82DlOxEyv3zirq0Q-fv', 1),
(56, 11, 'ARAM comeback', 'I can\'t believe this happened', 'LOL', 1, '10tukvWkPIoQJcaNG6Gk3gkbCIsuu9Bk9', 1),
(57, 5, 'Perfect play', 'My first time in this zone', 'PUBG', 1, '1MrB90jwDFZKbuXv07h8iDiihGLxqDOYG', 1),
(58, 5, 'Chicken Dinner', 'Easy chicken dinner', 'PUBG', 2, '1oGuBkAGDk95aXwtk8FEXAciyrLFuXkXm', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AttendeeType`
--
ALTER TABLE `AttendeeType`
  ADD PRIMARY KEY (`userID`,`eventID`),
  ADD KEY `fk_AttendeeType_Event_idx` (`eventID`);

--
-- Indexes for table `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`videoID`,`userID`,`commentID`);

--
-- Indexes for table `Event`
--
ALTER TABLE `Event`
  ADD PRIMARY KEY (`eventID`,`locationID`),
  ADD KEY `fk_Event_EventLocation_idx` (`locationID`);

--
-- Indexes for table `EventLocation`
--
ALTER TABLE `EventLocation`
  ADD PRIMARY KEY (`locationID`);

--
-- Indexes for table `Message`
--
ALTER TABLE `Message`
  ADD PRIMARY KEY (`messageID`),
  ADD KEY `fk_Message_User_idx` (`messageToID`),
  ADD KEY `fk_Message_User_idx1` (`messageFromID`);

--
-- Indexes for table `Region`
--
ALTER TABLE `Region`
  ADD PRIMARY KEY (`regionID`),
  ADD UNIQUE KEY `regionID_UNIQUE` (`regionID`);

--
-- Indexes for table `Team`
--
ALTER TABLE `Team`
  ADD PRIMARY KEY (`teamID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD KEY `fk_User_Team1_idx` (`teamID`),
  ADD KEY `fk_User_Region_idx` (`regionID`);

--
-- Indexes for table `Video`
--
ALTER TABLE `Video`
  ADD PRIMARY KEY (`videoID`,`userID`),
  ADD UNIQUE KEY `reference_UNIQUE` (`reference`),
  ADD KEY `fk_Video_User_idx` (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Event`
--
ALTER TABLE `Event`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `EventLocation`
--
ALTER TABLE `EventLocation`
  MODIFY `locationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `Message`
--
ALTER TABLE `Message`
  MODIFY `messageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `Region`
--
ALTER TABLE `Region`
  MODIFY `regionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Team`
--
ALTER TABLE `Team`
  MODIFY `teamID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `Video`
--
ALTER TABLE `Video`
  MODIFY `videoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AttendeeType`
--
ALTER TABLE `AttendeeType`
  ADD CONSTRAINT `fk_AttendeeType_Event` FOREIGN KEY (`eventID`) REFERENCES `Event` (`eventid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_AttendeeType_User` FOREIGN KEY (`userID`) REFERENCES `User` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `fk_Comment_Video` FOREIGN KEY (`videoID`) REFERENCES `Video` (`videoid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Event`
--
ALTER TABLE `Event`
  ADD CONSTRAINT `fk_Event_EventLocation` FOREIGN KEY (`locationID`) REFERENCES `EventLocation` (`locationid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Message`
--
ALTER TABLE `Message`
  ADD CONSTRAINT `fk_Message_UserFrom` FOREIGN KEY (`messageFromID`) REFERENCES `User` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Message_UserTo` FOREIGN KEY (`messageToID`) REFERENCES `User` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `fk_User_Region` FOREIGN KEY (`regionID`) REFERENCES `Region` (`regionid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_User_Team` FOREIGN KEY (`teamID`) REFERENCES `Team` (`teamid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Video`
--
ALTER TABLE `Video`
  ADD CONSTRAINT `fk_Video_User` FOREIGN KEY (`userID`) REFERENCES `User` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
