import Post from "../../database/modals/post.js";
import User from "../../database/modals/user.js";
import App from "../../database/modals/app.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config.js";

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the details"
      });
    }

    const user = await User.findOne({
      email: email
    });

    if (user) {
      return res.status(403).json({
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

    await newUser.save();

    const token = jwt.sign(newUser._id, config.JWT_SECRET);

    res.status(200).json({
      message: "Your account was created successfully",
      token: token
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
      return res.status(400).json({
        message: "Please fill all the details"
      });
    }

    const user = await User.findOne({
      username: username
    });

    if (!user) {
      return res.status(404).json({
        message: "Account does not exist"
      });
    }

    const decodedPassword = await bcrypt.compare(password, user.password);

    if (!decodedPassword) {
      return res.status(401).json({
        message: "Provided password was wrong"
      });
    }

    const token = jwt.sign(user, config.JWT_SECRET);

    res.status(200).json({
      message: "You logged in successfully",
      token: token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}

exports.changeTheme = async (req, res) => {
  try {
    const userId = req.user._id;
    const { theme } = req.body;

    const user = await User.findOne({
      _id: userId
    });

    if (theme.trim() !== "Dark".toLowerCase() || theme.trim() !== "White".toLowerCase()) {
      return res.status(400).json({
        message: "Please select Dark or White theme"
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "Account does not exist"
      });
    }

    await App.updateOne({
      user: user
    }, {
      $set: {
        theme: theme
      }
    });

    res.status(200).json({
      message: `Your app theme was changed to ${theme}`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
}
