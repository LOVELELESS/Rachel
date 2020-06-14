import express from "express";
import UserModel from "../models/User";
const authRoutes = express.Router();

/*
    req.body 
        - userid
    res.data 
        - isVerified?: boolean,
        - error: boolean     
*/
authRoutes.post("/login", (req, res) => {
  const { userid } = req.body;
  UserModel.findOne({ userid })
    .then((user) => {
      if (user) {
        return res.json({
          isVerified: true,
          error: false,
        });
      } else {
        return res.json({
          isVerified: false,
          error: false,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({
        error: true,
      });
    });
});

/*
    req.body 
        - userid
        - workspaceName
    res.data 
        - isSaved?: boolean,
        - error: boolean     
*/
authRoutes.post("/link_workspace", (req, res) => {
  const { userid, workspaceName } = req.body;
  const newUser = new UserModel({ userid, workspaceName, meetings: [] });
  newUser.save((err) => {
    if (err) {
      return res.json({
        error: true,
      });
    } else {
      // saved!
      return res.json({
        isSaved: true,
        error: false,
      });
    }
  });
});

export default authRoutes;
