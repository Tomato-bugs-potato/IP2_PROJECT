-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 16, 2024 at 10:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jopia_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `educations`
--

CREATE TABLE `educations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `uniName` varchar(255) DEFAULT NULL,
  `degreeLevel` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `startYear` date DEFAULT NULL,
  `endYear` date DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `educations`
--

INSERT INTO `educations` (`id`, `user_id`, `uniName`, `degreeLevel`, `field`, `startYear`, `endYear`, `description`) VALUES
(16, 13, 'AASTU', '3rd year', 'Software engineering', '2024-05-10', '2024-05-11', 'perfect student'),
(17, 13, 'AASTU', '3rd year', 'Software engineering', '2024-05-10', '2024-05-11', 'perfect student'),
(18, 10, 'TULU DIMTU', '3rd year', 'very very ', '2024-05-08', '2024-05-10', 'fds'),
(19, 10, 'TULU DIMTU', '3rd year', 'very very ', '2024-05-08', '2024-05-10', 'fds'),
(20, 10, 'TULU DIMTU', '3rd year', 'very very ', '2024-05-08', '2024-05-10', 'fds'),
(21, 10, 'TULU DIMTU', '3rd year', 'very very ', '2024-05-08', '2024-05-10', 'fds'),
(22, 10, 'TULU DIMTU', '3rd year', 'very very ', '2024-05-08', '2024-05-10', 'fds'),
(23, 10, 'TULU DIMTU', '3rd year', 'very very ', '2024-05-08', '2024-05-10', 'fds'),
(25, 19, 'piyassa', 'bolle', 'very very ', '2024-05-10', '2024-05-18', '4');

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `jobName` varchar(255) DEFAULT NULL,
  `jobType` varchar(255) DEFAULT NULL,
  `jobLocation` varchar(255) DEFAULT NULL,
  `startYear` date DEFAULT NULL,
  `endYear` date DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `user_id`, `jobName`, `jobType`, `jobLocation`, `startYear`, `endYear`, `description`) VALUES
(1, 13, 'STUD D', 'Dot mot', 'Ayat', '2024-05-01', '2024-05-02', 'not in tersted'),
(14, 10, 'Student', 'Development', 'addis ababa', '2024-05-07', '2024-05-10', 'fds'),
(15, 10, 'Student', 'Development', 'addis ababa', '2024-05-08', '2024-05-09', ''),
(16, 19, 'student g-5', 'Development', 'addis ababa', '2024-05-17', '2024-06-01', 'ew'),
(17, 24, 'Student', 'Development', 'addis ababa', '2024-05-09', '2024-05-23', 'gfregfeggre'),
(18, 24, 'Student', 'Development', 'addis ababa', '2024-05-09', '2024-05-18', 'ge');

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `job_posting_id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `currEmployment` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `experienceLevel` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `applicationDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `user_id`, `job_posting_id`, `fullName`, `currEmployment`, `email`, `phone`, `experienceLevel`, `description`, `applicationDate`) VALUES
(9, 24, 60, 'michael getu', 'student', 'michaelgetu21@gmail.com', '092325899', 'Any experience', 'student at  addis and happy to get job', '2024-05-09');

-- --------------------------------------------------------

--
-- Table structure for table `job_postings`
--

CREATE TABLE `job_postings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `jobTitle` varchar(255) DEFAULT NULL,
  `companyLogo` longblob DEFAULT NULL,
  `minPrice` decimal(10,2) DEFAULT NULL,
  `maxPrice` decimal(10,2) DEFAULT NULL,
  `salaryType` varchar(50) DEFAULT NULL,
  `jobLocation` varchar(255) DEFAULT NULL,
  `postingDate` date DEFAULT NULL,
  `experienceLevel` varchar(255) DEFAULT NULL,
  `employmentType` varchar(255) DEFAULT NULL,
  `jobType` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `job_postings`
--

INSERT INTO `job_postings` (`id`, `user_id`, `companyName`, `jobTitle`, `companyLogo`, `minPrice`, `maxPrice`, `salaryType`, `jobLocation`, `postingDate`, `experienceLevel`, `employmentType`, `jobType`, `description`) VALUES
(57, 10, 'Ayele Jobs', 'Carpenter', NULL, 10000.00, 40000.00, 'Monthly', 'addis ababa', '2024-05-11', 'Internship', 'Part-time', 'technology', 'knkl'),
(58, 10, 'Ayele Jobs', '', 0x696d616765732f62616869724461722e6a7067, 40000.00, 80000.00, 'Monthly', 'addis ababa', '2024-05-11', 'Internship', 'Part-time', 'technology', 'knkl'),
(59, 13, 'Ayele Jobs', 'carter', 0x696d616765732f70726f66696c654261636b47726f756e642e6a7067, 10000.00, 40000.00, 'Yearly', 'addis ababa', '2024-05-17', 'Internship', 'Part-time', 'design', 'dsa'),
(60, 24, 'Ayele Jobs', 'full stack developer', 0x696d616765732f68656172742e706e67, 10000.00, 40000.00, 'Monthly', 'addis ababa', '2024-05-18', 'Any experience', 'Part-time', 'human resources', 'blq bql bqlq');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `currJobLocation` varchar(255) DEFAULT NULL,
  `aboutMe` varchar(255) DEFAULT NULL,
  `jobName` varchar(255) DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `coverPicture` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `bio`, `currJobLocation`, `aboutMe`, `jobName`, `profilePicture`, `coverPicture`, `password`) VALUES
(10, 'MICHAEL GETU MULUNEH', 'dom@gmail.com', '092325899', 'I am a student at aastu university of dumb dumb', 'AASTU', 'fds', 'Student', 'images/tuluDimtu.jpg', 'images/wallpaperflare.com_wallpaper.jpg', '$2y$10$PnfCgHvLfygsxZRQ9FA/Y./oqwVehZkMCDNCRHCYIKXZ2Mcv6ZkiC'),
(13, 'michael getu', 'woina@gmail.com', '092325899', 'I am a student at aastu university of dumb dumb', 'AASTU', '', 'Student', NULL, NULL, '$2y$10$zv7Ns6IKF7JyWMRzNFkTEeVHUn5scht483TotO0vbhncwmTnUKj56'),
(19, 'MICHAEL GETU', 'alemuYared@gmail.com', '0923258995', 'I am a student at aastu university of dumb dumb', 'AASTU', 'I am a astudent in addis abeba sifi university', 'Student', NULL, NULL, '$2y$10$yuM8H06mkG6TJIa3.RYOfuyAZvopAiQLhweFrSEa6Tn8vdAoeMyvS'),
(20, NULL, 'baland@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$22SOg6rz2uG5mYVxfOz7vOdn079E/PU2DJpJWU41NJDIdiqt8pvlq'),
(21, NULL, 'michaelgetuu21@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$XqBlabLVZ8mRuotKcCf59eKkenbEQRR3k96yh6kKMcABmHfvKJfTi'),
(22, NULL, 'michaelgffetu21@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$o7gREk1o4ggNbMXTbT6Xou6zvQmSgPbbF0voAcx7AoFZDboWgwPMu'),
(23, NULL, 'mimi@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$z5MwvWq5xmqIY1pQqLaCxuG1ZVzHtFgxQdJgkzqj9/FxWATXp3SJ.'),
(24, 'michael getu', 'alemifleke@gmail.com', '092325899', 'I am a student at aastu university of dumb dumb', 'AASTU', 'dum dum dudm dim dum d', 'Student', 'images/UDMY_BIG.png', 'images/motive.jpg', '$2y$10$jIeuDCjBgR2GInTHSlPhm.BiumBpUerBxtzcjVnXffEGUYgBp3D.K');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `educations`
--
ALTER TABLE `educations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `job_posting_id` (`job_posting_id`);

--
-- Indexes for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `educations`
--
ALTER TABLE `educations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `job_postings`
--
ALTER TABLE `job_postings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `educations`
--
ALTER TABLE `educations`
  ADD CONSTRAINT `educations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `experiences`
--
ALTER TABLE `experiences`
  ADD CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `fk_job_posting_id` FOREIGN KEY (`job_posting_id`) REFERENCES `job_postings` (`id`),
  ADD CONSTRAINT `job_applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `job_applications_ibfk_2` FOREIGN KEY (`job_posting_id`) REFERENCES `job_postings` (`id`),
  ADD CONSTRAINT `job_posting_id` FOREIGN KEY (`job_posting_id`) REFERENCES `job_postings` (`id`);

--
-- Constraints for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD CONSTRAINT `job_postings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
