import bcrypt from 'bcrypt'

export const hashPassword=async(password)=>{
    let hashedPassword = await bcrypt.hash(password,process.env.SALT)
    return hashedPassword
}

export const comparePassword = async(password,hash)=>{
    let comparedPassword = await bcrypt.compare(password,hash)
    return comparedPassword
}