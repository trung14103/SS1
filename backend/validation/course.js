
module.exports = function validateCourseInput(data) {
    let errors = {};
    let isFormValid = true;

    if(!data.id || (data.id.length < 3 || data.id.trim().length > 15)) {
        isFormValid = false;
        errors.id = "Please provide correct course id (Length: 3-10)"
    }

    if(!data.name || (data.name.trim().length <2 || data.name.trim().length > 30) || typeof data.name !== 'string') {
        isFormValid = false;
        errors.name = "Please provide correct course name (Length: 2-30)"
    }


    return {
        errors,
        isValid: isFormValid
    }

};