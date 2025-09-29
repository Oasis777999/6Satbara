const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Property = require("../Models/Property");

//Add property
router.post("/add", async (req, res) => {
  try {
    const property = new Property(req.body);
    const savedProperty = await property.save();

    res.status(201).json({
      message: "Property added successfully",
      data: savedProperty,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding property",
      error: error.message,
    });
  }
});

// List of registerd property
router.get("/list", async (req, res) => {
  try {
    const result = await Property.find();
    res.status(200).json({
      message: "Property fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Property",
      error: error.message,
    });
  }
});

// Update property
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id; // ✅ Extract just the id string
    
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // ✅ new: true returns the updated doc
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating property",
      error: error.message,
    });
  }
});

// Delete property
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      res.status(404).json({ message: "Property not found" });
    }

    res
      .status(200)
      .json({ message: "Property Deleted", data: deletedProperty });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deletring property", error: error.message });
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
    const property = await Property.findById(id);
    if (!property) {
      return res.status(400).json({ error: "Product not found" });
    }

    if (!property.images.includes(imageToDelete)) {
      return res.status(404).json({ error: "Image not found in the property" });
    }

    property.images = property.images.filter((img) => img !== imageToDelete);

    await property.save();
    res.status(200).json({data : property, message:"Image Deleted"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET property by ID
router.get("/single/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (err) {
    console.error("Error fetching property:", err.message);

    // Handle invalid ObjectId (e.g. malformed ID)
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
