const validator = require('validator');

module.exports = function validateStudentInput(data) {
    let errors = {};
    let isFormValid = true;

    if(!data.id || (data.id.trim().length < 5 && data.id.trim().length > 10)) {
        isFormValid = false;
        errors.id = "Please provide correct student id (Length: 5-10)"
    }

    if(!data.firstName || (data.firstName.trim().length <2 && data.firstName.trim().length > 10) || typeof data.firstName !== 'string') {
        isFormValid = false;
        errors.firstName = "Please provide correct student first name (Length: 2-10)"
    }

    if(!data.lastName || (data.lastName.trim().length <2 && data.lastName.trim().length > 10) || typeof data.lastName !== 'string') {
        isFormValid = false;
        errors.lastName = "Please provide correct student last name (Length: 2-10)"
    }

    if(!data.address || (data.id.trim().address <8 && data.address.trim().length > 20) || typeof data.address !== 'string') {
        isFormValid = false;
        errors.address = "Please provide correct student address (Length: 8-20)"
    }

    if(!data.dob) {
        isFormValid = false;
        errors.dob = "Please provide correct student date of birth"
    }

    return {
        errors,
        isValid: isFormValid
    }

};