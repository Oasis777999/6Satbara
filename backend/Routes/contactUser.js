const router = require("express").Router();
const Contact = require("../Models/contact");


router.post("/add", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact); // 201 Created
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const contact = await Contact.find();

    res.status(200).send(contact);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
