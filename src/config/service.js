const isEmptyOrNull = (value)=>{
    if(value === null || value == ""){
        return true
    }
   return false
}

module.exports = {
    isEmptyOrNull
}