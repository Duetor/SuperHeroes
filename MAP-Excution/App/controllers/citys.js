const {City} = require ('../models/citys');

const initCity = (name, position_x, position_y) => {
    return new City ({
        name,
        position_x,
        position_y,
        vilan: false,
        etat : 1
    }).save();
};

const upCity = (name) => {
    City.findOne({name:name}).
        then( thiscity => {
        thiscity.vilan = true;
        thiscity.save();
    })
    };


module.exports = {initCity,upCity};