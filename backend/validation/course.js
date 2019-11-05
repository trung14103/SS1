const validator = require('validator');

module.exports = function validateCourseInput(data) {
    let errors = {};
    let isFormValid = true;

    if(!data.id || (data.id.trim().length < 5 && data.id.trim().length > 10)) {
        isFormValid = false;
        errors.id = "Please provide correct course id (Length: 5-10)"
    }

    if(!data.name || (data.name.trim().length <2 && data.name.trim().length > 15) || typeof data.name !== 'string') {
        isFormValid = false;
        errors.name = "Please provide correct course name (Length: 2-15)"
    }

    // if(!data.prerequisites || (data.prerequisites.trim().length <2 && data.prerequisites.trim().length > 10) || typeof data.prerequisites !== 'string') {
    //     isFormValid = false;
    //     errors.prerequisites = "Please provide correct prerequisites (Length: 2-10)"
    // }

    return {
        errors,
        isValid: isFormValid
    }

};