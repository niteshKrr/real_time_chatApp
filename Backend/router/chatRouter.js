const { json } = require("express");
const express = require("express");
const router = new express.Router();
const userAuth = require("../middlewares/authMiddleware");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");



router.use("/onetoone", userAuth);
router.use("/creategroup", userAuth);
router.use("/renamegroup", userAuth);
router.use("/addusertogroup", userAuth);
router.use("/removeuserfromgroup", userAuth);

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


// ------------------------------------------------------

router.get("/onetoone", async (req, res) => {

  try {
    const chatings = await Chat.find({
      user: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 })
      .then(async(results) => {
      results = await User.populate(results, {
        path: "latestMessage.sender",
        select: "name email",
      });
        res.status(200).send(results)
    })
  }
  catch (e) {
    res.status(404).send({ data: e });
  }
  

 });


// -------------------------------------------------------



router.post("/creategroup", async(req, res) => {

  const { allusers, name } = req.body;

  if (!allusers || !name) {
    return res.status(400).send({ "message": "please fill all the fields" });
  }

  var users = JSON.parse(allusers);

  if (users.length < 2) {
    return res.status(400).send({ message: "more than two peoples are required for group chat" });
  }

  users.push(req.user);

  try {
    const groupchat = await Chat.create({

      chatName: name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
      
    });

    const fullGroupChat = await Chat.find({ _id: groupchat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    
    res.status(200).send(fullGroupChat);
  }
  catch (e) {
     res.status(404);
     throw new Error(error.message);
  }

 });



 // --------------------------------------------------------


router.put("/renamegroup", async(req, res) => {

  const { chatId, chatName } = req.body;

  const updateChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName: chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateChat) {
    res.status(404).send("chat not found");
  }
  else {
    res.status(200).send(updateChat);
  }

 });



 // --------------------------------------------------------------

router.put("/addusertogroup", async(req, res) => { 
  const { chatId, userId } = req.body;

  const addedToGroup = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users : userId }},
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addedToGroup) {
    res.status(404).send("chat not found");
  }
  else {
    res.status(200).send(addedToGroup);
  }
});
 


// -------------------------------------------------------------


router.put("/removeuserfromgroup", async(req, res) => { 
  const { chatId, userId } = req.body;

  const removedFromGroup = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users : userId }},
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removedFromGroup) {
    res.status(404).send("chat not found");
  }
  else {
    res.status(200).send(removedFromGroup);
  }
});





module.exports = router