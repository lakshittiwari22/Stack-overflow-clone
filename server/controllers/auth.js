import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/auth.js";
import axios from "axios";
import twilio from "twilio";

export const signup = async (req, res) => {
  //signup with google------------------

  //normal signup -----------------------------------
  const { name, email, phoneNumber, password } = req.body;
  console.log(phoneNumber);
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already exist" });
    }

    const hashedpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      phoneNumber,
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

export const otpVerification = async (req, res) => {
  // Set up Twilio
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const twilioClient = twilio(accountSid, authToken);

  // Function to generate a random OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Function to send OTP via Twilio
  const sendOtpViaTwilio = async (to, otp) => {
    console.log(to, otp);
    try {
      const message = await twilioClient.messages.create({
        body: `Your OTP for verification is: ${otp}`,
        from: "+16182683635",
        to,
      });

      console.log(`OTP sent successfully. SID: ${message.sid}`);
    
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
      console.error("Error sending OTP:", error.message);
    }
  };

  const { phoneNumber } = req.body;

  // Generate a random OTP
  const otp = generateOTP();

  // Save the OTP in your database (optional)

  // Send OTP via Twilio
  await sendOtpViaTwilio(phoneNumber, otp);

  res.json({ success: true, message: otp });
};



export const loginWithOTP = async (req, res) => {
 
  const { phoneNumber } = req.body;

  try {
    const existinguser = await User.findOne({ phoneNumber });

    if (!existinguser) {
      return res.status(404).json({ message: "User does'nt exist!" });
    }

   

    const token = jwt.sign(
      { phoneNumber: existinguser.phoneNumber, id: existinguser._id },
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