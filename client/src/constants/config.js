//API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading : {
        title : 'Loading...',
        msg : 'Data is being loaded...'
    },
    success : {
        title : 'Success',
        msg : 'Data loaded successfully'
    },
    responseFailure: {
        title:'Error',
        msg : 'An error occured while fetching data. Please try again later'
    },
    requestFailure: {
        title:'Error',
        msg : 'An error occured while parsing request data'
    },
    networkError:{
        title : 'Network Error',
        msg : 'Please check your internet connection'
    }
}

//API SERVICE CALL
//SAMPLE REQUEST
//NEED SERVICE CALL: { url : '/', method : 'POST/GET/DELETE/PUT' , params : true/false, query : true/false  }

export const SERVICE_URLS = {
    userSignUp:{ url : '/signup', method : 'POST' },
    userLogin:{ url : '/login', method : 'POST' }
}