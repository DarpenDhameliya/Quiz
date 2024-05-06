const successmessage = ( result) => {
    return {
        status: 'ok',
        response: result,
    }
}

const errormessage = (error) => {
    return {
        status: 'error',
        error,
    }
}
const successmessageValidate = (result, totalPages) => {
    return {
        status: 'ok',
        result,
        totalPages
    }
}


module.exports = { successmessage, errormessage, successmessageValidate }