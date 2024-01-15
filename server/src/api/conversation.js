const express = require("express");
const { verifyToken } = require("../middleware/authorize");
const {
  getConversation,
  sendMessage,
  getFriendRequest,
  sendInvitation,
  friendRequestStt,
  updateSettings,
  getSettings,
  getFriendList,
  conversations,
  editContact,
  createGroupConversation,
} = require("../controller/conversation");
const { Group } = require("../models/Group");
const { default: mongoose } = require("mongoose");
const { Conversation } = require("../models/Conversation");
const { uploadImage, upload } = require("../utils/cloudinary");

const router = express.Router();

router.get("/getFriendRequest", verifyToken, getFriendRequest);

router.get("/settings", verifyToken, getSettings);

router.get("/friendList/:id", verifyToken, getFriendList);

router.post("/sendMessage", verifyToken, sendMessage);

router.post("/getConversation/:groupName?", getConversation);

router.post("/sendInvitation/:id", verifyToken, sendInvitation);

router.post("/friendRequestStt/:id", verifyToken, friendRequestStt);

router.post("/settings", verifyToken, updateSettings);

router.post("/conversations", verifyToken, conversations);

router.post("/editContact", verifyToken, editContact);

router.post("/groupConversation", verifyToken, createGroupConversation);

router.post("/addUser/:id", async (req, res) => {
  const _id = await req.params.id;
  const { participant } = await req.body;

  try {
    const group = await Group.findOne({ conversation: _id });

    if (group) {
      const existedMember = await Group.findOne({
        members: { _id: participant },
      });
      if (existedMember) {
        return res
          .status(200)
          .send({ message: "This user is already existed in this group!!" });
      } else {
        await Group.findOneAndUpdate(
          { conversation: _id },
          { $push: { members: { _id: participant } } }
        );

        await Conversation.findOneAndUpdate(
          { _id },
          { $push: { participant: participant } }
        );

        return res.status(200).send({ message: "Add user successfully 🥳" });
      }
    } else {
      return res.status(401).send({ message: "This is no group !!" });
    }
  } catch (error) {
    return res.status(500).send(`Infernal server error ${error}`);
  }
});

router.post("/leaveGroup/:id", verifyToken, async (req, res) => {
  try {
    const token = await req.decoded;
    const groupId = await req.params.id;

    const group = await Group.findOne({ _id: groupId });
    const conversation = await Conversation.findOne({ group: groupId });

    if (group && conversation) {
      await Group.updateOne(
        { _id: groupId },
        { $pull: { members: { $in: [token.user._id] } } }
      );
      await Conversation.updateOne(
        { group: groupId },
        { $pull: { participant: { $in: [token.user._id] } } }
      );
      return res.status(200).send({ message: "You leaved the group !!" });
    } else {
      return res.status(404).send({ message: "This is no group !!" });
    }
  } catch (error) {
    return res.status(500).send(`Infernal server error ${error}`);
  }
});

router.post("/notifications", async (req, res) => {});

router.post("/uploadImg", upload, async (req, res) => {
  const { imgPath } = await req.body;

  const img = await uploadImage(imgPath);

  return res.status(200).send({ img });
});



module.exports = router;
