const User = require("../Models/User");
const adminMail = process.env.adminMail;

const createDefaultAdmin = async () => {
  try {
    const adminEmail = adminMail;
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {

      const admin = new User({
        firstName: "Super",
        lastName:"Admin",
        email: adminEmail,
        phone:9999999999,
        password: "Admin@123",
        role:"Admin",
        isAdmin: true,
      });
      
      await admin.save();
      console.log("✅ Default admin created.");
    } else {
      console.log("ℹ️ Admin already exists.");
    }
  } catch (err) {
    console.error("❌ Failed to create admin:", err.message);
  }
};

module.exports = createDefaultAdmin;
