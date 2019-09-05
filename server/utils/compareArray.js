
const compareArray = (newExercises, oldExercises) => {
	let addExercises		= []
	let deleteExercises 	= [...oldExercises]
	let changeExercises 	= []

    // Compare newExercises against oldExercises!
    newExercises.forEach( newExercise => {
        const oldExerciseArray = oldExercises.filter( oldExercise => {
            return oldExercise.exerciseid === newExercise.exerciseid;
        })
        // console.log('oldExerciseArray = ',oldExerciseArray)
        // console.log('oldExerciseArray.length = ',oldExerciseArray.length)

        if(oldExerciseArray.length === 0) {
            // new exercise
            addExercises.push(newExercise);

        } else {
            // Exercise already exists
            // Start comparing changes
            const oldExercise = oldExerciseArray[0]
            let isChanged = false;
            const keys = Object.keys(newExercise)
            keys.forEach((key) => {
                if(key==='reps') {
                    if(newExercise.reps !== oldExercise.reps) {
                        isChanged = true;
                    }
                } else if(key==='sets') {
                    if(newExercise.sets !== oldExercise.sets) {
                        isChanged = true;
                    }
                } else if(key==='weight') {
                    if(newExercise.weight !== oldExercise.weight) {
                        isChanged = true;
                    }
                } else if(key==='sequenceNumber') {
                    if(newExercise.sequenceNumber !== oldExercise.sequenceNumber) {
                        isChanged = true;
                    }
                }
            })
            if(isChanged) {
                changeExercises.push(newExercise);
            }

            // Update deleteExercises
            deleteExercises = deleteExercises.filter( exercise => {
                return exercise.exerciseid !== newExercise.exerciseid;
            })
        }
    })
    return { addExercises, deleteExercises, changeExercises }
}

module.exports = {compareArray}