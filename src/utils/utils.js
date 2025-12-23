export const isEmailValid = (email) =>{
    let emailRegex = /^([a-zA-Z0-9_+.-])+@+(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
    
}

export const checkUserLoginStatus = () =>{
    let userData = localStorage.getItem("userData");
    if(userData === null){
        return false;
    }
    else{
        return true;
    }
}

export const userLoggedInId = () =>{
    let userData = localStorage.getItem("userData");
    let userId = JSON.parse(userData).id;
    return userId;
}

export const getLoggedInUserName = () =>{
    let userData = localStorage.getItem("userData");
    let UserName = JSON.parse(userData).name;
    return UserName;
}

export const getLoggedInUserEmail = () =>{
    let userData = localStorage.getItem("userData");
    let userEmail = JSON.parse(userData).email;
    return userEmail;
}

export const getJwtToken = () => {
    return localStorage.getItem("token");
}