const nodemailer = require('nodemailer');
var easyinvoice = require('easyinvoice');

const transport = nodemailer.createTransport({
  // service: 'gmail',
  host: 'smtp.gmail.com',
  // port: 587,
  ignoreTLS: false,
  secure: false,
  auth: {
    user: 'digitallearninggroupmits@gmail.com',
    pass: '%DLG%321',
  },
});

//send email
exports.sendMail = async (req, res) => {
  try {
    const message = `
    Hello ${req.name}, 😃
    We hope you and your family are well and in best of health. This
    is a confirmation mail that you have successfully booked your seat
    in our Robotics workshop. 

    Timing and other details would be informed to you through mail.
    In case of any query feel free to contact DLG team.

    --------------------------------------------------
    For more such information do follow us on Instagram :

    digital_learning_group_mits
    https://instagram.com/digitallearninggroupmits?igshid=15yvsswtkloc8
    --------------------------------------------------
    
    Best regards,
    Digital Learning Group`;
    const mailOptions = {
      from: 'digitallearninggroupmits@gmail.com',
      to: req.email,
      subject: 'Thank you for joining DLG!!',
      text: message,
    };

    transport.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).json({
      message: 'Email sent',
      // applicant: req.applicant,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.sendFile = async (req, res) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const data = {
    documentTitle: 'RECEIPT',
    currency: 'INR',
    taxNotation: 'gst',
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 25,
    logo: 'https://dlgserver.herokuapp.com/logo',
    sender: {
      company: 'Digital Learning Group',
      address: 'Madhav Institue of Technology and science',
      zip: '474006',
      city: 'Gwaliour',
      country: 'India',
    },
    client: {
      company: req.user.name,
      address: req.user.email,
      zip: req.user.mobile,
      city: req.user.branch,
      custom1: req.user.enrollment,
      custom2: req.user.college,
      country: 'India',
    },
    invoiceNumber: req.user.orderId,
    invoiceDate: new Date().toLocaleDateString(undefined, options),
    products: [
      {
        quantity: 1,
        description: 'Robotics Design in Fusion 360',
        tax: 0.0,
        price: req.user.amount,
      },
    ],
  };

  easyinvoice.createInvoice(data, function(result) {
    const mailOptions = {
      from: 'digitallearninggroupmits@gmail.com',
      to: req.user.email,
      subject: 'Payment successfull',
      text: 'Download and keep this receipt safe with yourself',
      attachments: [
        {
          filename: `Receipt.pdf`,
          content: result.pdf,
          encoding: 'base64',
        },
      ],
    };

    transport.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);
      }
    });
  });

  res.status(200).json({
    status: 'success',
    message: 'payment confirmation is sent to your mail.',
  });
};

//--------------
