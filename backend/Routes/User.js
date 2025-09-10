const router = require("express").Router();
const User = require("../Models/User");

//Add user
// signup route (if you're not hashing)
router.post("/register", async (req, res) => {
  const { firstName, lastName, phone, email, role, password } = req.body;
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }
    const newUser = new User({ firstName, lastName, phone, email, role, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for existing user
    const user = await User.findOne({ email });    

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    // Simple password check (INSECURE for production)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return basic user data
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isAdmin:user.isAdmin,
        role:user.role
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// List of registerd user
router.get("/list", async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json({
      message: "Users fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// Update user
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id; // ✅ Extract just the id string
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // ✅ new: true returns the updated doc
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});

// Delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Deleted", data: deletedUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deletring user", error: error.message });
  }
});

module.exports = router;
