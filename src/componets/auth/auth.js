
export const loginau = (cl) =>{
    
    return localStorage.getItem('Authoraization')? true :false
    
}
export const logout =(cl) =>{
    localStorage.clear();
}