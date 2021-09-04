const AppError = require('./../utils/appError');
const Recruitment = require('./../models/RecruitmentModel');
const { response } = require('express');

exports.createRecruitment = async (req, res, next) => {
  try {
    if (req.body.domain.length === 0) {
      next(new AppError(`please choose your domain`, 400));
    }
    if (
      req.body.enrollment.length < 12 ||
      !req.body.enrollment.includes(0901)
    ) {
      next(new AppError(`Invalid enrollment no.`, 400));
    }
    if (!req.body.why) {
      next(new AppError(`please write why you want to join DLG.`, 400));
    }
    const recruitments = await Recruitment.create(req.body);
    const totalApplicant = await Recruitment.find({ rejected: false });
    req.email = req.body.email;
    req.applicant = recruitments;
    req.totalApplicant = totalApplicant.length;

    next();
  } catch (error) {
    // console.log(error.message);
    // res.status(500).json({
    //   message: error.message,
    //   error: error,
    // });
    next(error);
  }
};

exports.getRecruitment = async (req, res) => {
  try {
    const recruitments = await Recruitment.find();

    res.status(200).json({
      message: 'Recruitment Data',
      total: recruitments.length,
      applicants: recruitments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getFilteredRecruitment = async (req, res, next) => {
  try {
    let data;
    const type = req.params.type;
    if (type === 'year') {
      data = await Recruitment.find({
        year: req.params.year[0],
        rejected: false,
      });
    }
    if (type.toLocaleLowerCase() === 'all') {
      data = await Recruitment.find({ accepted: false, rejected: false });
    }
    if (type === 'rejected') {
      data = await Recruitment.find({ rejected: true });
    }
    if (type === 'accepted') {
      data = await Recruitment.find({ accepted: true });
    }

    res.status(200).json({
      status: 'success',
      applicants: data,
      total: data.length,
    });
  } catch (error) {
    next(new AppError('Something bad happened!', 404));
  }
};

exports.getUserByEmailandEnrollment = async (req, res, next) => {
  try {
    let response;
    if (req.body.term) {
      if (req.body.term.includes('@' || '.com' || 'gmail')) {
        response = await Recruitment.findOne({
          email: req.body.term,
        });
        res.status(200).json({
          applicant: response,
          message: 'success',
        });
        return;
      }
      if (req.body.term.startsWith('0901')) {
        response = await Recruitment.findOne({
          enrollment: req.body.term,
        });
        res.status(200).json({
          applicant: response,
          message: 'success',
        });
        return;
      }

      return next(new AppError('No data Found!!', 400));
    } else {
      next(new AppError('No data Found!!', 400));
    }
  } catch (error) {
    next(new AppError('something wrong happened!', 500));
  }
};

// exports.deleteRecruitment = async (req, res) => {
//   try {
//     const recruitments = await Recruitment.findByIdAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       {
//         rejected: true,
//         accepted: false,
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       message: 'Data deleted!',
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

exports.updateRecruitment = async (req, res) => {
  try {
    let recruitments;
    console.log(req.params.type);
    if (req.params.type === 'accept') {
      recruitments = await Recruitment.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          rejected: false,
          accepted: true,
        },
        { new: true }
      );
    }
    if (req.params.type === 'reject') {
      recruitments = await Recruitment.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { rejected: true, accepted: false },
        { new: true }
      );
    }

    res.status(200).json({
      message: 'Data updated!',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

// exports.updateAllDocument = async (req, res) => {
//   try {
//     const recruitments = await Recruitment.updateMany({}, { rejected: false });

//     res.status(200).json({
//       message: 'Data updated!',
//     });
//   } catch (error) {
//     // console.log(error.message);
//     res.status(500).json({
//       error,
//       message: error.message,
//     });
//   }
// };
