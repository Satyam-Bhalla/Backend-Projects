const fs = require("fs");
const HttpError = require("../util/http-error");
const file = require("../public/config/data");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const getRandomData = () => {
  let index = getRandomInt(file.data.length);
  return file.data[index];
}

const getData = (req, res, next) => {
  let data = {};
  try {
    data =  getRandomData();
    return res.status(201).json(data);
  } catch (err) {
    return next(new HttpError("Invalid request", 422));
  }

  
};

const submitData = (req, res, next) => {
  try {
  let data = file.data;
  let body = req.body;
  let updatedData = [...data, body];
  file.data = updatedData;
  let fileName = file.basePath+"public/config/data.json";
  // console.log(fileName);
  fs.writeFileSync(fileName,JSON.stringify(file));
  return res.status(201).json({
    "message": "Data posted successfully"
  });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Invalid request", 422));
  }

  
};


exports.getData = getData;
exports.submitData = submitData;