const TestModel = require('./../models/TestModel');

exports.createDoc = async (req, res) => {
  try {
    const doc = await TestModel.create(req.body);

    res.status(200).json({
      message: 'success',
      data: doc,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

exports.getDoc = async (req, res) => {
  try {
    const doc = await TestModel.find({});

    res.status(200).json({
      message: 'success',
      data: doc,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};

exports.updateDoc = async (req, res) => {
  try {
    const doc = await TestModel.findOneAndReplace(
      { _id: '603f1f83f25bf09d1f71052f' },
      { name: 'new name' }
    );

    await doc.save();
    res.status(200).json({
      message: 'success',
      data: doc,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({
      error,
      message: error.message,
    });
  }
};
