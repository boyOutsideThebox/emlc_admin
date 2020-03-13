const subCategoryLocation = require('../models').hs_subCategory_location_mapping;
const serviceSubCategory = require('../models').hs_service_sub_categories;
const Location = require('../models').hs_location;

exports.GetAllsubCategoryLocationList = (req, res, next) => {
  return subCategoryLocation
    .findAll({
        order: ['sub_cat_id'],
        include: [{ model: serviceSubCategory, attributes: ['id', 'name'] },
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
      var Arrsubcatids = [];
      for (let i = 0; i < jsonData.length; i++) {
        Arrsubcatids.push(jsonData[i].sub_cat_id);
      }
      const distinctSubcatids = [...new Set(Arrsubcatids)];
      //   console.log(jsonData);
      var response = [];
      for (let index = 0; index < distinctSubcatids.length; index++) {
        var servJson = {};
        var location_data = [];
        const filterData = jsonData.filter( ({ sub_cat_id }) => sub_cat_id === distinctSubcatids[index] );
        // console.log("filterData", filterData);
        servJson['sub_cat_id'] = filterData[0].sub_cat_id;
        servJson['sub_cat_name'] = filterData[0].hs_service_sub_category.name;
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

exports.GetsubCategoryLocationBySubCatId = (req, res, next) => {
    var psub_cat_id = req.params.sub_cat_id;
    return subCategoryLocation
    .findAll({
        where: {
          sub_cat_id: psub_cat_id     
        },
        include: [{ model: serviceSubCategory, attributes: ['id', 'name'] },
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
      var Arrsubcatids = [];
      for (let i = 0; i < jsonData.length; i++) {
        Arrsubcatids.push(jsonData[i].sub_cat_id);
      }
      const distinctSubcatids = [...new Set(Arrsubcatids)];
      var response = [];
      for (let index = 0; index < distinctSubcatids.length; index++) {
        var servJson = {};
        var location_data = [];
        const filterData = jsonData.filter( ({ sub_cat_id }) => sub_cat_id === distinctSubcatids[index] );
        // console.log("filterData", filterData);
        servJson['sub_cat_id'] = filterData[0].sub_cat_id;
        servJson['sub_cat_name'] = filterData[0].hs_service_sub_category.name;
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

exports.CreatesubCategoryLocation = (req, res, next) => {
    var createData = JSON.parse(JSON.stringify(req.body));
    subCategoryLocation.bulkCreate(createData, {
        returning: true
    })
    .then(result => {
        res.status(201).json({
            message: 'SubCategory Location Mapping Created Successfully',
            data: result
        });
    })
    .catch((error) => res.status(400).send(error));
};

// exports.UpdatesubCategoryLocationBySubCatId = (req, res, next) => {
//     var ploc_id = req.params.loc_id;
//     var psub_cat_id = req.params.sub_cat_id;
//     return subCategoryLocation
//     .findAll({
//         where: {
//           sub_cat_id: psub_cat_id,
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
//       return subCategoryLocation
//         .update(updateData, 
//             {   where: {
//                     sub_cat_id: data[0].dataValues.sub_cat_id,
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

exports.DeletesubCategoryLocationBySubCatId = (req, res, next) => {
    var deleteData = JSON.parse(JSON.stringify(req.body));
    var Arrsubcatids = [];
    var Arrlocids = [];
    for (let i = 0; i < deleteData.length; i++) {
        Arrsubcatids.push(deleteData[i].sub_cat_id);
        Arrlocids.push(deleteData[i].loc_id);
    }
    const distinctSubcatids = [...new Set(Arrsubcatids)];
    const distinctlocationids = [...new Set(Arrlocids)];
    // console.log(distinctSubcatids);
    // console.log(distinctlocationids);
    return subCategoryLocation
    .destroy({   
        where: {
            sub_cat_id: distinctSubcatids,
            loc_id: distinctlocationids        
        }     
    })
    .then(() => res.status(204).send())
    .catch((error) => res.status(400).send(error));
};

