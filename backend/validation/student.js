
module.exports = function validateStudentInput(data) {
    let errors = {};
    let isFormValid = true;

    if(!data.id || (data.id.length < 5 && data.length > 10)) {
        isFormValid = false;
        errors.id = "Please provide correct student id (Length: 5-10)"
    }

    if(!data.firstName || (data.firstName.trim().length <2 && data.firstName.trim().length > 20) || typeof data.firstName !== 'string') {
        isFormValid = false;
        errors.firstName = "Please provide correct student first name (Length: 2-20)"
    }

    if(!data.lastName || (data.lastName.trim().length <2 && data.lastName.trim().length > 20) || typeof data.lastName !== 'string') {
        isFormValid = false;
        errors.lastName = "Please provide correct student last name (Length: 2-20)"
    }

    if(!data.address || (data.address.trim() <8 && data.address.trim().length > 50) || typeof data.address !== 'string') {
        isFormValid = false;
        errors.address = "Please provide correct student address (Length: 8-50)"
    }

    if(!data.dob) {
        isFormValid = false;
        errors.dob = "Please provide valid student date of birth"
    }

    return {
        errors,
        isValid: isFormValid
    }

};