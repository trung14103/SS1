const validator = require('validator');

module.exports = function validateStudentInput(data) {
    let errors = {};
    let isFormValid = true;

    if(!data.student_id || (data.student_id.trim().length <5 && data.student_id.trim().length > 10) || typeof data.student_id !== 'number') {
        isFormValid = false;
        errors.student_id = "Please provide correct student id (Length: 5-10; Number)"
    }

    if(!data.student_firstName || (data.student_firstName.trim().length <2 && data.student_firstName.trim().length > 10) || typeof data.student_firstName !== 'string') {
        isFormValid = false;
        errors.student_id = "Please provide correct student first name (Length: 2-10)"
    }

    if(!data.student_lastName || (data.student_lastName.trim().length <2 && data.student_lastName.trim().length > 10) || typeof data.student_lastName !== 'string') {
        isFormValid = false;
        errors.student_lastName = "Please provide correct student last name (Length: 2-10)"
    }

    if(!data.student_address || (data.id.trim().student_address <8 && data.student_address.trim().length > 20) || typeof data.student_address !== 'string') {
        isFormValid = false;
        errors.student_address = "Please provide correct student address (Length: 8-20)"
    }

    if(!data.student_dob) {
        isFormValid = false;
        errors.student_dob = "Please provide correct student date of birth"
    }

    return {
        errors,
        isValid: isFormValid
    }

};