const express = require("express");
const router = new express.Router();
const userAuth = require("../middlewares/authMiddleware");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");





router.use("/onetoone", userAuth);

router.post("/onetoone", async(req, res) => {

  const { userId } = req.body;

    if (!userId) {
        console.log("uerId not provided");
        return res.satus(404).send("uerId not provided");
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
        .populate("latestMessage");
    
    isChat = User.populate(isChat, {
        path: "latestMessage.sender",
        select : "name email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        var chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };

        try {

            const createChat = await Chat.create(chatData);

            const fullChat = await Chat.findOne({
              _id: createChat._id,
            }).populate("users", "-password");
            res.status(200).send(fullChat);
            
        }
        catch (e) {
            
            res.status(404);
            throw new Error(error.message);
        }
    }

 });




router.get("/", (req, res) => {});
router.post("/group", (req, res) => {});
router.put("/rename", (req, res) => {});
router.put("/groupremove", (req, res) => { });
router.put("/groupadd", (req, res) => {});






module.exports = router