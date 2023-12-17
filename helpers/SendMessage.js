const SendMessage = (status, code, message, data) => {
    if(status){
        return {
            data,
            status: "success",
            code: code,
            message: message
        }
    } else {
        return {
            status: "error",
            code: code,
            message: message
        }
    }
}

export default SendMessage