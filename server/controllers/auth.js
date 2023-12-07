import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/auth.js";
import axios from "axios";

export const signup = async (req, res) => {
  //signup with google------------------

  //normal signup -----------------------------------
  const { name, email, password } = req.body;
  console.log();
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("something went wrong...");
  }
};

export const signUpGoogle = async (req, res) => {
  const AccessToken = req.body.googleAccessToken;
  if (AccessToken) {
    //request for userinfo

    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      })
      .then(async (response) => {
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const email = response.data.email;
        const picture = response.data.picture;
        const googleID = response.data.sub;

        const existinguser = await User.findOne({ email });

        if (existinguser) {
          const token = jwt.sign(
            { email: existinguser.email, id: existinguser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );

          res.status(200).json({ result: existinguser, token });
        } else {
          const newUser = await User.create({
            name: firstName,
            email,
            googleID: googleID,
            profileImg: picture,
          });
          console.log("new user created");
          const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({ result: newUser, token });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "Invalid access token!" });
      });
  }
};

export const login = async (req, res) => {
  //login with google--------------------
  // if (req.body.googleAccessToken) {
  //   const googleAccessToken = req.body;
  //   axios
  //     .get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //       headers: {
  //         Authorization: `Bearer ${googleAccessToken}`,
  //       },
  //     })
  //     .then(async (response) => {
  //       const email = response.data.email;

  //       const existinguser = await User.findOne({ email });

  //       if (!existinguser) {
  //         return res.status(400).json({ message: "user dosen't exist!" });
  //       }

  //       const token = jwt.sign(
  //         { email: existinguser.email, id: existinguser._id },
  //         process.env.JWT_SECRET,
  //         {
  //           expiresIn: "1h",
  //         }
  //       );
  //       res.status(200).json({ result: existinguser, token });
  //     })
  //     .catch((err) => {
  //       res.status(400).json({ message: "Invalid access token!" });
  //     });

  // }
  // normal login----------------
  //login data
  const { email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email });

    if (!existinguser) {
      return res.status(404).json({ message: "User does'nt exist!" });
    }

    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("something went wrong...");
  }
};
