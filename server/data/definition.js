//=====================================
// BODYPART & EXERCISE
//=====================================

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
  //   INDEX exercise_bodypartid_idx (bodypartId ASC), \

//=====================================
// USER & TOKEN
//=====================================

const USER_DEF =
"CREATE TABLE user ( \
  id INT NOT NULL AUTO_INCREMENT, \
  username VARCHAR(32) NOT NULL, \
  password VARCHAR(512) NOT NULL, \
  email varchar(256) NOT NULL, \
  PRIMARY KEY (id), \
  UNIQUE KEY username_UNIQUE (username ASC), \
  UNIQUE KEY email_UNIQUE (email));";

const TOKEN_DEF =
"CREATE TABLE token ( \
  id INT NOT NULL AUTO_INCREMENT, \
  access VARCHAR(16) NOT NULL, \
  token VARCHAR(512) NOT NULL, \
  userid INT NOT NULL, \
  PRIMARY KEY (id), \
  CONSTRAINT token_userid FOREIGN KEY (userid) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION \
);";
//   INDEX token_userid_idx (userid ASC), \


//=====================================
// WORKOUT
//=====================================

const WORKOUT_DEF = 
"CREATE TABLE workout (  \
  id INT NOT NULL AUTO_INCREMENT, \
  name VARCHAR(32) NOT NULL, \
  description VARCHAR(256) NOT NULL, \
  userid INT NOT NULL, \
  PRIMARY KEY (id), \
  INDEX workout_userid_idx (userid ASC), \
  CONSTRAINT workout_userid FOREIGN KEY (userid) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION \
 );";

 const WORKOUT_EXERCISE_DEF = 
 "CREATE TABLE workout_exercise (  \
  workoutid INT NOT NULL,  \
  exerciseid INT NOT NULL,  \
  INDEX workout_excercise_workoutid_idx (workoutid ASC),  \
  INDEX workout_exercise_exerciseid_idx (exerciseid ASC),  \
  PRIMARY KEY (workoutid, exerciseid),  \
  CONSTRAINT workout_exercise_workoutid FOREIGN KEY (workoutid) REFERENCES workout (id) ON DELETE NO ACTION ON UPDATE NO ACTION,  \
  CONSTRAINT workout_exercise_exerciseid FOREIGN KEY (exerciseid) REFERENCES exercise (id) ON DELETE NO ACTION ON UPDATE NO ACTION  \
  );";


module.exports = {BODYPART_DEF,EXERCISE_DEF,USER_DEF,TOKEN_DEF,WORKOUT_DEF,WORKOUT_EXERCISE_DEF};