-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 03 juin 2021 à 12:31
-- Version du serveur :  10.4.19-MariaDB
-- Version de PHP : 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `artisan`
--

-- --------------------------------------------------------

--
-- Structure de la table `artisan`
--

CREATE TABLE `artisan` (
  `id` bigint(20) NOT NULL,
  `adresse` varchar(250) DEFAULT NULL,
  `biographie` varchar(1000) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(40) NOT NULL,
  `note` float NOT NULL,
  `password` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `secteur` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` bigint(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `demande`
--

CREATE TABLE `demande` (
  `id` int(11) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `date_creation` varchar(255) DEFAULT NULL,
  `date_realisation` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `etat` bit(1) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `secteur` varchar(255) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `demandeur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `demande_devis`
--

CREATE TABLE `demande_devis` (
  `Demande_id` int(11) NOT NULL,
  `listDevis_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `devis`
--

CREATE TABLE `devis` (
  `id` int(11) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `prix` double NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `demande_id` int(11) DEFAULT NULL,
  `deviseur_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `project`
--

CREATE TABLE `project` (
  `id` bigint(20) NOT NULL,
  `name` varchar(40) NOT NULL,
  `owner_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `artisan`
--
ALTER TABLE `artisan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_jfkv1fruj0trc008f38vrstlv` (`email`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_bfgjs3fem0hmjhvih80158x29` (`email`);

--
-- Index pour la table `demande`
--
ALTER TABLE `demande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKg829iunhixv7o2koy132m0oma` (`demandeur_id`);

--
-- Index pour la table `demande_devis`
--
ALTER TABLE `demande_devis`
  ADD UNIQUE KEY `UK_20al532qkiedfri64ehipfhv0` (`listDevis_id`),
  ADD KEY `FKcqdx1joh16y4je73vr8splq2j` (`Demande_id`);

--
-- Index pour la table `devis`
--
ALTER TABLE `devis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrcbtgm6pcobs9bt1prfppq7vy` (`demande_id`),
  ADD KEY `FKtiuj8r4nlgg2hn2himwyt5kv6` (`deviseur_id`);

--
-- Index pour la table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKclfkpiukuxeb432t3sb6th1qi` (`owner_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `artisan`
--
ALTER TABLE `artisan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `demande`
--
ALTER TABLE `demande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT pour la table `devis`
--
ALTER TABLE `devis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `project`
--
ALTER TABLE `project`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `demande`
--
ALTER TABLE `demande`
  ADD CONSTRAINT `FKg829iunhixv7o2koy132m0oma` FOREIGN KEY (`demandeur_id`) REFERENCES `client` (`id`);

--
-- Contraintes pour la table `demande_devis`
--
ALTER TABLE `demande_devis`
  ADD CONSTRAINT `FK977mf36pa3sq6t6he3i7vx0sp` FOREIGN KEY (`listDevis_id`) REFERENCES `devis` (`id`),
  ADD CONSTRAINT `FKcqdx1joh16y4je73vr8splq2j` FOREIGN KEY (`Demande_id`) REFERENCES `demande` (`id`);

--
-- Contraintes pour la table `devis`
--
ALTER TABLE `devis`
  ADD CONSTRAINT `FKrcbtgm6pcobs9bt1prfppq7vy` FOREIGN KEY (`demande_id`) REFERENCES `demande` (`id`),
  ADD CONSTRAINT `FKtiuj8r4nlgg2hn2himwyt5kv6` FOREIGN KEY (`deviseur_id`) REFERENCES `artisan` (`id`);

--
-- Contraintes pour la table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `FKclfkpiukuxeb432t3sb6th1qi` FOREIGN KEY (`owner_id`) REFERENCES `artisan` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
