
const BODYPART_DEF =
"CREATE TABLE `bodypart` ( \
    `id` int(11) NOT NULL, \
    `name` varchar(80) NOT NULL, \
    PRIMARY KEY (`id`) \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;";

const EXERCISE_DEF =
"CREATE TABLE `exercise` ( \
    `id` int(11) NOT NULL, \
    `name` varchar(80) DEFAULT NULL, \
    `imgName` varchar(80) NOT NULL, \
    `description` varchar(255) NOT NULL, \
    `bodypartId` int(11) NOT NULL,\
    PRIMARY KEY (`id`), \
    CONSTRAINT `bodypartId` FOREIGN KEY (`bodypartId`) REFERENCES `bodypart` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;";

//=====================================
// USER
//=====================================

/* From  SQL workbench
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(512) NOT NULL,
  `email` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `password_UNIQUE` (`password`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
*/

const USER_DEF =
"CREATE TABLE user ( \
  id INT NOT NULL AUTO_INCREMENT, \
  username VARCHAR(32) NOT NULL, \
  password VARCHAR(512) NOT NULL, \
  email varchar(256) NOT NULL, \
  PRIMARY KEY (id), \
  UNIQUE KEY username_UNIQUE (username ASC), \
  UNIQUE KEY password_UNIQUE (password ASC), \
  UNIQUE KEY email_UNIQUE (email));";

/* From  SQL workbench
CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access` varchar(16) NOT NULL,
  `token` varchar(512) NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `userid` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
*/

const TOKEN_DEF =
"CREATE TABLE token ( \
  id INT NOT NULL AUTO_INCREMENT, \
  access VARCHAR(16) NOT NULL, \
  token VARCHAR(512) NOT NULL, \
  userid INT NULL, \
  PRIMARY KEY (id), \
  CONSTRAINT userid FOREIGN KEY (id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION \
);";
  


module.exports = {BODYPART_DEF,EXERCISE_DEF,USER_DEF,TOKEN_DEF};