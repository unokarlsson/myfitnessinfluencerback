// Basic test by using mocha
// npm install mocha --save-dev

const assert          = require('assert')
const {compareArray}  = require('./compareArray')

describe('compareArray', function() {

    it('should only return item in addExercises array', function() {
        const newExercises = [ {
            exerciseid: 3,
            reps: 12,
            sets: 2,
            weight: 25,
            sequenceNumber: 0
        } ]
        const oldExercises = [
        ]
        
        let result = compareArray(newExercises,oldExercises)

        // console.log('result.addExercises     = ',result.addExercises)
        // console.log('result.deleteExercises  = ',result.deleteExercises)
        // console.log('result.changeExercises  = ',result.changeExercises)-+

        assert.equal(result.addExercises.length,1)
        assert.equal(result.deleteExercises.length,0)
        assert.equal(result.changeExercises.length,0)
    });

    it('should only return item in deleteExercises array', function() {
        const newExercises = []
        const oldExercises = [ {
            exerciseid: 3,
            reps: 12,
            sets: 2,
            weight: 25,
            sequenceNumber: 0
        } ]
    
        let result = compareArray(newExercises,oldExercises)

        // console.log('result.addExercises     = ',result.addExercises)
        // console.log('result.deleteExercises  = ',result.deleteExercises)
        // console.log('result.changeExercises  = ',result.changeExercises)

        assert.equal(result.addExercises.length,0)
        assert.equal(result.deleteExercises.length,1)
        assert.equal(result.changeExercises.length,0)
    });

    it('should only return item in changeExercises array', function() {
        const newExercises = [ {
            exerciseid: 3,
            reps: 9,
            sets: 1,
            weight: 70,
            sequenceNumber: 0
        } ]
        const oldExercises = [ {
            exerciseid: 3,
            reps: 12,
            sets: 2,
            weight: 25,
            sequenceNumber: 0
        } ]
    
        let result = compareArray(newExercises,oldExercises)

        // console.log('result.addExercises     = ',result.addExercises)
        // console.log('result.deleteExercises  = ',result.deleteExercises)
        // console.log('result.changeExercises  = ',result.changeExercises)

        assert.equal(result.addExercises.length,0)
        assert.equal(result.deleteExercises.length,0)
        assert.equal(result.changeExercises.length,1)
    });

    // TODO: Add tests with more than 1 exercise in the newExcercises, and oldExercises
});
