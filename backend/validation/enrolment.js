
module.exports = function validateEnrolment(data) {
    let errors = {};
    let isFormValid = true;

    if(!data.course || (data.course.length < 3 || data.course.length > 15)) {
        isFormValid = false;
        errors.course = "Please provide correct course id (Length: 3-10)"
    }

    if(!data.student || (data.student.length < 5 || data.student.length > 15)) {
        isFormValid = false;
        errors.student = "Please provide correct student id (Length: 5-10)"
    }

    if(!data.semester) {
        isFormValid = false;
        errors.semester = "Please provide semester"
    }

    return {
        errors,
        isValid: isFormValid
    }

};