const Group = require('../models/group-model');

const home = async (req , res) => {
    try {

        res.status(200).send("Welcome to best App again");
        
    } catch (error) {
        
        //console.log("error");
        res.status(400).send({message:"page not found"});
    }
}

const getGroups = async (req, res) => {
  try {
      const groups = await Group.find();
      res.status(200).json(groups);
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch groups", error });
  }
};

const createGroup = async (req, res) => {
    try {
      const { name, color } = req.body;
  
      if (!name || !color) {
        return res.status(400).json({ message: "Name and color are required" });
      }
  
      const newGroup = new Group({ name, color });
      await newGroup.save();
  
      res.status(201).json(newGroup);
    } catch (error) {
      res.status(500).json({ message: "Failed to create group", error });
    }
  };

module.exports ={ home , getGroups , createGroup };