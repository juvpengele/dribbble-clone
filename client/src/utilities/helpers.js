
export function handleFormErrors(formErrors, formik) {
    const { errors } = formErrors;

    if (! errors) {
        return null;
    }

    for(let error in errors) {
        formik.errors[error] = errors[error][0];
    }
}

export default {
    handleFormErrors
}
