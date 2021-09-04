const nodemailer = require("nodemailer");
const Recruitment = require("../models/RecruitmentModel");
const AppError = require("../utils/appError");

const transport = nodemailer.createTransport({
  // service: 'gmail',
  host: "smtp.gmail.com",
  // port: 587,
  ignoreTLS: false,
  secure: false,
  auth: {
    user: "digitallearninggroupmits@gmail.com",
    pass: "DIGITAL@1234",
  },
});

const whatsappGroup = [
  "https://chat.whatsapp.com/BCIVbC1HLwM5nQQS90G2AO",
  "https://chat.whatsapp.com/C3t0sm3bysdKcjNBAekmDE",
  "https://chat.whatsapp.com/LjlyZpscAWl4mOeW0pu3ZK",
  "https://chat.whatsapp.com/DFkY6oWmDfwLmM8q2FIXQB",
  "https://chat.whatsapp.com/K6eGTSTGgfyCAN7iBDenwj",
  "https://chat.whatsapp.com/EZQpMLkhISs0SXGjqqUt9g",
  "https://chat.whatsapp.com/BkODe9DntdqD1yMxcLnhM6",
  "https://chat.whatsapp.com/CBXFotCaYSUKfr19ewL3Br",
  "https://chat.whatsapp.com/DT2QXzIT7OJH6TJGlegoCX",
  "https://chat.whatsapp.com/BsQXmxsHVGHJmxVoZeFZgB",
];

// const applicants = [
//   {
//     name: 'Ajay yadav',
//     email: 'aju9617@gmail.com',
//     enrollment: '0901ET191004',
//   },
//   {
//     name: 'Ajay yadav',
//     email: 'aju9617@gmail.com',
//     enrollment: '0901ET191004',
//   },
//   {
//     name: 'Ajay yadav',
//     email: 'aju9617@gmail.com',
//     enrollment: '0901ET191004',
//   },
//   {
//     name: 'Ajay yadav',
//     email: 'aju9617@gmail.com',
//     enrollment: '0901ET191004',
//   },
//   {
//     name: 'Ajay yadav',
//     email: 'aju9617@gmail.com',
//     enrollment: '0901ET191004',
//   },
//   {
//     name: 'Ajay yadav',
//     email: 'aju9617@gmail.com',
//     enrollment: '0901ET191004',
//   },
//   {
//     name: 'Ajay yadav',
//     email: 'aju9617@gmail.com',
//     enrollment: '0901ET191004',
//   },
//   {
//     name: 'Ajay yadav',
//     email: 'aju9617@gmail.com',
//     enrollment: '0901ET191004',
//   },
//   {
//     name: 'Ajay yadav',
//     email: 'aju9617@gmail.com',
//     enrollment: '0901ET191004',
//   },
// ];

//send email
exports.sendEmailNotice = async (req, res, next) => {
  try {
    const proposals = await Recruitment.find({ rejected: false });
    const applicants = proposals.slice(203, 210);
    console.log("service activated!");
    console.log("Total Receivers count is " + applicants.length);
    applicants.forEach((applicant, i) => {
      sendMail(applicant, i, next);
    });

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//182-207
const sendMail = (applicant, i, next) => {
  const group = whatsappGroup[9];
  const message = `
        Hello ${applicant.name}, 
        <br/>
        <br/>
        We hope you're healthy and happy. 
    
        You have been successfully registered for the recruitment process. 
        and your token number is <span style="color: #fcba03; font-weight: bold;">${applicant.enrollment}</span>. please keep this token number with 
        you at the time of Interview.
        <br/>
        <br/>
        -------------
        <br/>
        We request you to join the whatsApp group below. 
        ${group}
        <br/>
        All the information about the recruitment process will be given in the group. 
        <br/>
        <br/>
        If you've already joined the group, then kindly ignore this mail. 

        <br/>
        <br/>
        Regards,  
        <br/>
        Digital Learning Group`;

  const mailOptions = {
    from: "digitallearninggroupmits@gmail.com",
    to: applicant.email,
    subject: "Thank you for joining DLG!!",
    html: message,
  };

  transport.sendMail(mailOptions, function(err, info) {
    console.log(info.accepted[0]);
    if (err) {
      console.log(err);
      return next(new AppError(`service blocked at ${applicant.email}`, 400));
    }
  });
};
