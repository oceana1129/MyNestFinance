import Test from "../models/Test.js";

/**
 * Will return all test objects
 *
 * Notes:
 *  - .find() returns all objects
 *  - .sort({createdAt: -1}) will sort by newly created
 *  - .sort({createdAt: 1}) will sort by oldest created
 * @param {*} req
 * @param {*} res
 */
export async function getAllTests(_, res) {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All tests found:\n", tests });
  } catch (err) {
    console.error("Error in getAllTests controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will return a specific test object
 *
 * Notes:
 *  - .find({}) gives you a object based on its parameter
 *  - req.params.id gives you the parameter through the url (the id)
 * @param {*} req
 * @param {*} res
 */
export async function getTestById(req, res) {
  try {
    const test = await Test.findById(req.params.id);
    res
      .status(200)
      .json({ message: `Test with id ${req.params.id} found`, test });
  } catch (err) {
    console.error("Error in getTestById controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will create a specific test object
 *
 * Notes:
 *  - req.body will give you the content passed through the request
 * @param {*} req
 * @param {*} res
 */
export async function createTest(req, res) {
  try {
    const { title, content } = req.body;
    const newTest = new Test({ title, content });
    const savedTest = await newTest.save();
    res.status(201).json({ message: "Test created successfully!", savedTest });
  } catch (err) {
    console.error("Error in createTest controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will update a specific test object
 *
 * Notes:
 *  - req.body will give you the content passed through the request
 *  - req.params.id gives you the parameter through the url (the id)
 * @param {*} req
 * @param {*} res
 */
export async function updateTest(req, res) {
  try {
    const { title, content } = req.body;
    const newTest = await Test.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true },
    );
    if (!newTest) return res.status(404).json({ message: "Test not found" });
    res.status(200).json({ message: "Test updated successfully!", newTest });
  } catch (err) {
    console.error("Error in updateTest controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}

/**
 * Will delete a specific test object
 *
 * Notes:
 *  - req.body will give you the content passed through the request
 *  - req.params.id gives you the parameter through the url (the id)
 * @param {*} req
 * @param {*} res
 */
export async function deleteTest(req, res) {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    if (!deletedTest)
      return res.status(404).json({ message: "Test not found" });
    res
      .status(200)
      .json({ message: "Test deleted successfully!", deletedTest });
  } catch (err) {
    console.error("Error in deleteTest controller", err);
    res.status(500).json({ message: "internal server error" });
  }
}
