const multer = require('multer'); // uploading files to server and save database
const mkdirp = require('mkdirp') // Make Directory on server
var datetime = require('date-and-time');

const sequelize = require('../models').sequelize;

const currentdDate = datetime.format(new Date(), 'YYYY-MM-DD');
const year = datetime.format(new Date(), 'YYYY');
const month = datetime.format(new Date(), 'MM');
const day = datetime.format(new Date(), 'DD');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        var url = req.url;
        var filePath = url.split("/");
        console.log("req", filePath[1]);
        // const diruploadPath = `./Uploaded Files/${year}/${month}/${day}`;
        const diruploadPath = `./uploadedFiles/${filePath[1]}/${year}/${currentdDate}`;
        mkdirp(diruploadPath, err => callback(err, diruploadPath));
    },
    filename: async function(req, file, callback) {
        var url = req.url;
        var filePath = url.split("/");
        // var maxID = await sequelize.query("SELECT MAX(CustomerID) CustomerID FROM CustomerDetails", 
        //                 { type: sequelize.QueryTypes.SELECT }
        //             );
        // maxID = maxID[0];
        // var NxtmaxID = maxID.CustomerID + 1;
        // console.log(NxtmaxID)
        // callback(null, 'CustomerID_' + NxtmaxID + '_' + currentdDate + '_' + file.originalname);
        callback(null, filePath[1] + '_' + currentdDate + '_' + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    
    const extns = file.mimetype;
    // console.log(extns)
    var mimeTypes = ['application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/pdf', 'application/octet-stream'
                ];
    var matchMimetype = mimeTypes.indexOf(extns)
    // console.log(matchMimetype);
    if (matchMimetype == -1) {
        //accept a file
        callback(null, false);
    } else {
        //reject a file
        callback(null, true);
    } 

};


module.exports = {
    storage: storage,
    fileFilter: fileFilter
}
