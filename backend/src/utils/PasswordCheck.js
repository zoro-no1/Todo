import bcrypt from "bcrypt"

export default  function(password,thisPassword){
 return bcrypt.compare(password,thisPassword)
}