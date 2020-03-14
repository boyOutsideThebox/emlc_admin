const CompanyLocation = require('../models').hs_company_location_mapping;
const Company = require('../models').hs_company;
const Location = require('../models').hs_location;

exports.GetAllCompanyLocationList = (req, res, next) => {
  return CompanyLocation
    .findAll({
      order: ['comp_id'],
      include: [{ model: Company, attributes: ['id', 'name'] },
                  { model: Location, attributes: ['id', 'name'] }
            ]
    })
    .then((data) => {
      if (data.length == 0) {
        return res.status(404).send({
          message: 'Mapping Not Found',
        });
      }
      var jsonData = JSON.parse(JSON.stringify(data));
      var Arrcompids = [];
      for (let i = 0; i < jsonData.length; i++) {
        Arrcompids.push(jsonData[i].comp_id);
      }
      const distinctCompids = [...new Set(Arrcompids)];
      //   console.log(jsonData);
      var response = [];
      for (let index = 0; index < distinctCompids.length; index++) {
        var servJson = {};
        var location_data = [];
        const filterData = jsonData.filter( ({ comp_id }) => comp_id === distinctCompids[index] );
        // console.log("filterData", filterData);
        servJson['comp_id'] = filterData[0].comp_id;
        servJson['comp_name'] = filterData[0].hs_company.name;
        for (let j = 0; j < filterData.length; j++) {
            location_data.push(filterData[j].hs_location);
            servJson['location_data'] = location_data;
        }
        response.push(servJson);
      }
        // console.log(response);
      return res.status(200).send({
        message: 'Mapping Found',
        data: response
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

exports.GetCompanyLocationByCompId = (req, res, next) => {
    var pcomp_id = req.params.comp_id;
    return CompanyLocation
    .findAll({
      where: {
        comp_id: pcomp_id     
      },
      include: [{ model: Company, attributes: ['id', 'name'] },
                  { model: Location, attributes: ['id', 'name'] }
            ]
    })
    .then((result) => {
      if (result.length == 0) {
        return res.status(404).send({
          message: 'Mapping Not Found',
        });
      }
      var jsonData = JSON.parse(JSON.stringify(result));
      //   console.log(jsonData);
      var Arrcompids = [];
      for (let i = 0; i < jsonData.length; i++) {
        Arrcompids.push(jsonData[i].comp_id);
      }
      const distinctCompids = [...new Set(Arrcompids)];
      var response = [];
      for (let index = 0; index < distinctCompids.length; index++) {
        var servJson = {};
        var location_data = [];
        const filterData = jsonData.filter( ({ comp_id }) => comp_id === distinctCompids[index] );
        // console.log("filterData", filterData);
        servJson['comp_id'] = filterData[0].comp_id;
        servJson['comp_name'] = filterData[0].hs_company.name;
        for (let j = 0; j < filterData.length; j++) {
            location_data.push(filterData[j].hs_location);
            servJson['location_data'] = location_data;
        }
        response.push(servJson);
      }
      //   console.log(response);
      return res.status(200).send({
        message: 'Mapping Found',
        data: response
      });
    })
    .catch((error) => res.status(400).send(error));
};

exports.CreateCompanyLocation = (req, res, next) => {
  var createData = JSON.parse(JSON.stringify(req.body));
  CompanyLocation.bulkCreate(createData, {
      returning: true
    })
    .then(result => {
      res.status(201).json({
        message: 'Company Location Mapping Created Successfully',
        data: result
      });
    })
    .catch((error) => res.status(400).send(error));
};

// exports.UpdateCompanyLocationByCompId = (req, res, next) => {
//     var ploc_id = req.params.loc_id;
//     var pcomp_id = req.params.comp_id;
//     return CompanyLocation
//     .findAll({
//         where: {
//           comp_id: pcomp_id,
//           loc_id: ploc_id        
//         }
//     })
//     .then(data => {
//       if (data.length == 0) {
//         return res.status(404).send({
//           message: 'Mapping Not Found',
//         });
//       }
//       var updateData = {
//             loc_id: req.body.loc_id,
//         };
//     //   console.log(data[0].dataValues.loc_id)
//       return CompanyLocation
//         .update(updateData, 
//             {   where: {
//                     comp_id: data[0].dataValues.comp_id,
//                     loc_id: data[0].dataValues.loc_id        
//                 }     
//             }
//         )
//         .then((result) => res.status(200).send({
//           message: 'Mapping Updated Successfully',
//           data: result
//         }))
//         .catch((error) => res.status(400).send(error));
//     })
//     .catch((error) => res.status(400).send(error));
// };

exports.DeleteCompanyLocationByCompId = (req, res, next) => {
    var deleteData = JSON.parse(JSON.stringify(req.body));
    var Arrcompids = [];
    var Arrlocids = [];
    for (let i = 0; i < deleteData.length; i++) {
        Arrcompids.push(deleteData[i].comp_id);
        Arrlocids.push(deleteData[i].loc_id);
    }
    const distinctCompids = [...new Set(Arrcompids)];
    const distinctlocationids = [...new Set(Arrlocids)];
    // console.log(distinctCompids);
    // console.log(distinctlocationids);
    return CompanyLocation
      .destroy({   
          where: {
                comp_id: distinctCompids,
                loc_id: distinctlocationids      
            }     
        })
      .then(() => res.status(204).send())
      .catch((error) => res.status(400).send(error));

};

