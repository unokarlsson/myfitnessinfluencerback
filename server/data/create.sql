CREATE DATABASE `myfitnessinfluencer` /*!40100 DEFAULT CHARACTER SET latin1 */;


CREATE TABLE `bodypart` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `bodypart`(`id`,`name`) VALUES(1,'Arm');
INSERT INTO `bodypart`(`id`,`name`) VALUES(2,'Shoulder');
INSERT INTO `bodypart`(`id`,`name`) VALUES(3,'Breast');
INSERT INTO `bodypart`(`id`,`name`) VALUES(4,'Back');
INSERT INTO `bodypart`(`id`,`name`) VALUES(5,'Glute');
INSERT INTO `bodypart`(`id`,`name`) VALUES(6,'Leg');

INSERT INTO `myfitnessinfluencer`.`bodypart`(`id`,`name`) VALUES(1,'Arm');
INSERT INTO `myfitnessinfluencer`.`bodypart`(`id`,`name`) VALUES(2,'Shoulder');
INSERT INTO `myfitnessinfluencer`.`bodypart`(`id`,`name`) VALUES(3,'Breast');
INSERT INTO `myfitnessinfluencer`.`bodypart`(`id`,`name`) VALUES(4,'Back');
INSERT INTO `myfitnessinfluencer`.`bodypart`(`id`,`name`) VALUES(5,'Glute');
INSERT INTO `myfitnessinfluencer`.`bodypart`(`id`,`name`) VALUES(6,'Leg');


CREATE TABLE `exercise` (
  `id` int(11) NOT NULL,
  `name` varchar(80) DEFAULT NULL,
  `imgName` varchar(80) NOT NULL,
  `description` varchar(255) NOT NULL,
  `bodypartid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `bodypartid` FOREIGN KEY (`bodypartid`) REFERENCES `bodypart` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/* ARM */
INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (1,'Bicep Curl - Dumbbell','bicepCurl-dumbbell.jpg','TODO',1);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (2,'Tricep Press - Dumbbell','tricepPress-dumbbell.jpg','TODO',1);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (3,'Narrow Bench Press - Barebell','narrowBenchPress-barebell.png','TODO',1);

/* SHOULDER*/
INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (11,'Shoulder Press - Barebell','shoulderPress-barebell.jpg','TODO',2);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (12,'Lateral Raises - Dumbbell','lateralRaises-dumbbell.jpg','TODO',2);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (13,'Shoulder Row - Barebell','shoulderRow-barebell.jpg','TODO',2);

/* Breast */
INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (21,'Bench press - Barebell','benchPress-barebell.jpg','TODO',3);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (22,'Push Up - Bodyweight','pushUp-bodyweight.jpg','TODO',3);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (23,'Chest Fly - Dumbbell','chestFly-dumbbell.jpg','TODO',3);

/* Back */
INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (31,'Chins','chins.jpg','TODO',4);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (32,'Barebell Row','row-barebell.jpg','TODO',4);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (33,'Pull Down - Machine','pullDown-machine.jpg','TODO',4);

/* Glute */
INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (41,'Back Extention - Bodyweight','backExtention-bodyweight.jpg','TODO',5);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (42,'Hip Thrust - Barebell','hipThrust-barebell.jpg','TODO',5);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (43,'Deadlift - Barebell','deadLift-barebell.jpg','TODO',5);

/* Leg */
INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (51,'Squat - Bodyweight','squat-bodyweight.jpg','TODO',6);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (52,'Lunges - Bodyweight','lunges-bodyweight.jpg','TODO',6);

INSERT INTO `exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (53,'Leg Extentions - Machine','legExtention-machine.jpg','TODO',6);


/* ARM */
INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (1,'Bicep Curl - Dumbbell','bicepCurl-dumbbell.jpg','TODO',1);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (2,'Tricep Press - Dumbbell','tricepPress-dumbbell.jpg','TODO',1);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (3,'Narrow Bench Press - Barebell','narrowBenchPress-barebell.png','TODO',1);

/* SHOULDER*/
INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (11,'Shoulder Press - Barebell','shoulderPress-barebell.jpg','TODO',2);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (12,'Lateral Raises - Dumbbell','lateralRaises-dumbbell.jpg','TODO',2);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (13,'Shoulder Row - Barebell','shoulderRow-barebell.jpg','TODO',2);


/* Breast */
INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (21,'Bench press - Barebell','benchPress-barebell.jpg','TODO',3);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (22,'Push Up - Bodyweight','pushUp-bodyweight.jpg','TODO',3);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (23,'Chest Fly - Dumbbell','chestFly-dumbbell.jpg','TODO',3);

/* Back */
INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (31,'Chins','chins.jpg','TODO',4);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (32,'Barebell Row','row-barebell.jpg','TODO',4);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (33,'Pull Down - Machine','pullDown-machine.jpg','TODO',4);

/* Glute */
INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (41,'Back Extention - Bodyweight','backExtention-bodyweight.jpg','TODO',5);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (42,'Hip Thrust - Barebell','hipThrust-barebell.jpg','TODO',5);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (43,'Deadlift - Barebell','deadLift-barebell.jpg','TODO',5);

/* Leg */
INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (51,'Squat - Bodyweight','squat-bodyweight.jpg','TODO',6);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (52,'Lunges - Bodyweight','lunges-bodyweight.jpg','TODO',6);

INSERT INTO `myfitnessinfluencer`.`exercise` (`id`,`name`, `imgName`,`description`,`bodypartid`) 
VALUES (53,'Leg Extentions - Machine','legExtention-machine.jpg','TODO',6);





