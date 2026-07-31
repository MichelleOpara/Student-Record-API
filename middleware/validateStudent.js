function validateStudent(req, res, next) {

    const {
        firstName,
        lastName,
        email,
        course,
        yearOfStudy
    } = req.body;

    // Check all required fields
    if (
        !firstName ||
        !lastName ||
        !email ||
        !course ||
        !yearOfStudy
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    next();
}

module.exports = validateStudent;