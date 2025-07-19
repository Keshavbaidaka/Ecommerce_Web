const bcrypt =require('bcrypt');

exports.hashPassword=async (password)=>{
    try {
     const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success:false,
      message:"Problem in hashing password"
    })
  }
};

exports.comparePassword=async (password,hashedPassword)=>{
return bcrypt.compare(password, hashedPassword);
}