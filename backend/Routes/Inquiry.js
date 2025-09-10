const router = require("express").Router();
const Inquiry = require("../Models/Inquiry");


router.post("/add", async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).send(inquiry); // 201 Created
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const inquiry = await Inquiry.find();

    res.status(200).send(inquiry);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
