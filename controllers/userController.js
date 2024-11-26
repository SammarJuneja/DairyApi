import Post from "../../database/modals/post.js";
import User from "../../database/modals/user.js";
import bcrypt from "bcryptjs";

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        message: "Please fill all the details"
      });
    }

    const user = await User.findOne({
      email: email
    });

    if (user) {
      res.status(403).json({
        message: "User with provided email already exists"
      });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });

    res.status(200).json({
      message: "Your account was created successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        message: "Please fill all the details"
      });
    }

    const user = await User.findOne({
      username: username
    });

    if (!user) {
      res.status(404).json({
        message: "Account does not exist"
      });
    }

    const decodedPassword = await bcrypt.compare(password, user.password);

    if (!decodedPassword) {
      res.status(401).json({
        message: "Provided password was wrong"
      });
    }

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}
