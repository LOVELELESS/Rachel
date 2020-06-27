import express from "express";
import WorkspaceModel from "../models/Workspace";
import INotification from "../interfaces/INotification";
import * as admin from "firebase-admin";
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const notificationRoutes = express.Router();

notificationRoutes.get("/", (req, res) => {
  const { workspaceName }: { workspaceName: string } = req.body;

  res.json({
    msg: "hello world",
    workspaceName,
  });
});

/*
    CREATES NEW FORM WITH STATUS PENDING AND SENDS PUSH_NOTIFICATION TO FALLBACK EMPLOYEE WHEN DONE

    req.body 
        - workspaceName : string
        - content : string
    res.data 
        - msg : string
        - success : boolean     
*/
notificationRoutes.post("/form", (req, res) => {
  const {
    workspaceName,
    content,
  }: { workspaceName: string; content: string } = req.body;
  WorkspaceModel.findOne({ workspaceName })
    .then((workspace) => {
      if (workspace) {
        const newNotification: INotification = {
          id: workspace.notifications.length,
          content,
          status: "PENDING",
        };
        workspace.notifications.push(newNotification);
        workspace.save((err) => {
          if (err) {
            return res.json({
              msg: "An error has occurred while saving new form",
              success: false,
            });
          } else {
            const message = {
              data: {
                type: "warning",
                content: "A new weather warning has been created!",
              },
              notification: {
                title: "Baisc noti",
                body: "body of noti",
              },
            };

            admin
              .messaging()
              .sendToTopic("test", message, {
                contentAvailable: true,
                priority: "high",
              })
              .then((response) => {
                console.log("Successfully sent message:", response);
                return res.json({
                  msg: `Successfully saved new form and sent message to fallback employee`,
                  success: true,
                });
              })
              .catch((error) => {
                console.log("Error sending message:", error);
                return res.json({
                  msg: `Successfully saved new form but failed to send message to fallback employee`,
                  success: true,
                });
              });
          }
        });
      } else {
        res.json({
          msg: "No such workspace found",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occured", success: false }));
});

/*
    UPDATES EXISTING FORM WITH NEW STATUS AND RESPONSE FROM FALLBACK EMPLOYEE REPLY AND SENDS PUSH_NOTIFICATION TO RECEPTIONIST WHEN DONE

    req.body 
        - workspaceName : string
        - responseToForm : string
        - finalStatus : string
    res.data 
        - msg : string
        - success : boolean     
*/
notificationRoutes.post("/:formid/", (req, res) => {
  const {
    workspaceName,
    responseToForm,
    finalStatus,
  }: {
    workspaceName: string;
    responseToForm: string;
    finalStatus: "PENDING" | "ACCEPT" | "REJECT";
  } = req.body;
  const formid: string = req.params.formid;

  WorkspaceModel.findOne({ workspaceName, "notifications.id": formid })
    .then((workspace) => {
      if (workspace) {
        const intFormId = parseInt(formid);
        const newNotification: INotification = {
          id: intFormId,
          content: workspace.notifications[intFormId].content,
          status: finalStatus,
          response: responseToForm,
        };

        workspace.notifications[intFormId] = newNotification;
        workspace.save((err) => {
          if (err) {
            return res.json({
              msg: `An error has occurred while saving updating form ${formid}`,
              success: false,
            });
          } else {
            const message = {
              data: {
                type: "warning",
                content: "A new weather warning has been created!",
              },
              notification: {
                title: "Baisc noti",
                body: "body of noti",
              },
            };

            admin
              .messaging()
              .sendToTopic("test", message, {
                contentAvailable: true,
                priority: "high",
              })
              .then((response) => {
                console.log("Successfully sent message:", response);
                return res.json({
                  msg: `Successfully updated form ${formid} and sent message to receptionist`,
                  success: true,
                });
              })
              .catch((error) => {
                console.log("Error sending message:", error);
                return res.json({
                  msg: `Successfully updated form ${formid} but failed to send message receptionist`,
                  success: true,
                });
              });
          }
        });
      } else {
        res.json({
          msg: "No such workspace or formid found",
          success: false,
        });
      }
    })
    .catch((err) => res.json({ msg: "An error has occured", success: false }));
});

export default notificationRoutes;
