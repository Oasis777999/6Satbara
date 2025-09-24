const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Flat = require("../Models/Flats");

//Add flat
router.post("/add", async (req, res) => {
  try {    
    const flat = new Flat(req.body);
    
    
    const savedFlat = await flat.save();
    res.status(201).json({
      message: "Flat added successfully",
      data: savedFlat,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding flat",
      error: error.message,
    });
  }
});

// List of registerd flat
router.get("/list", async (req, res) => {
  try {
    const result = await Flat.find();
    res.status(200).json({
      message: "Flats fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Flat",
      error: error.message,
    });
  }
});

// Delete flat
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFlat = await Flat.findByIdAndDelete(id);

    if (!deletedFlat) {
      res.status(404).json({ message: "Flat not found" });
    }

    res
      .status(200)
      .json({ message: "Flat Deleted", data: deletedFlat });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deletring flat", error: error.message });
  }
});

// Update Flat
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id; // ✅ Extract just the id string
    console.log(req.body);
    
    
    const updatedFlat = await Flat.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // ✅ new: true returns the updated doc
    );

    if (!updatedFlat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.status(200).json({
      message: "Flat updated successfully",
      data: updatedFlat,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating flat",
      error: error.message,
    });
  }
});

// Delete the single image
router.patch("/delete-image/:id", async (req, res) => {
  const { id } = req.params;
  const { imageToDelete } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  if (!imageToDelete || typeof imageToDelete !== "string") {
    return res.status(400).json({ error: "Invalid or missing imageToDelete" });
  }

  try {
    const flat = await Flat.findById(id);
    if (!flat) {
      return res.status(400).json({ error: "Product not found" });
    }

    if (!flat.images.includes(imageToDelete)) {
      return res.status(404).json({ error: "Image not found in the flat" });
    }

    flat.images = flat.images.filter((img) => img !== imageToDelete);    

    await flat.save();
    res.status(200).json({data: flat, message:"Image Deleted"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET flat by ID
router.get("/single/:id", async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);

    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.status(200).json(flat);
  } catch (err) {
    console.error("Error fetching flat:", err.message);

    // Handle invalid ObjectId (e.g. malformed ID)
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid flat ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;