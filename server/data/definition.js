
const BODYPART_DEFINITION =
"CREATE TABLE `bodypart` ( \
    `id` int(11) NOT NULL, \
    `name` varchar(80) NOT NULL, \
    PRIMARY KEY (`id`) \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;";

const EXERCISE_DEFINITION =
"CREATE TABLE `exercise` ( \
    `id` int(11) NOT NULL, \
    `name` varchar(80) DEFAULT NULL, \
    `imgName` varchar(80) NOT NULL, \
    `description` varchar(255) NOT NULL, \
    `bodypartId` int(11) NOT NULL,\
    PRIMARY KEY (`id`), \
    CONSTRAINT `bodypartId` FOREIGN KEY (`bodypartId`) REFERENCES `bodypart` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION \
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;";

module.exports = {BODYPART_DEFINITION,EXERCISE_DEFINITION};