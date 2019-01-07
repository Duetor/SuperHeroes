const {Monture} = require ('../models/montures');

const initMonture = (name,state,energie,master,savage) => {
    return new Monture ({
        name,
        state,
        energie,
        master,
        savage,
        etat : 1
    }).save();
};

const getMonture = (name,callback) => {
    Monture.findOne({"master":name})
        .then(monture => {
            if (monture) {
                callback(monture);
            }
        })
        .catch(err => console.log(err));
};

const getFMonture = (callback) => {
    Monture.findOne({savage:true})
        .then(mount => {
            if (mount) {
                callback(mount);
            }
        });
};

const getLMonture = (statel,callback) => {
    Monture.findOne({savage:false}).
        where('state').equals(statel)
        .then(mount => {
            if (mount) {
                callback(mount);
            }
        });
};


const upSavageMonture = (name,etat) => {
    Monture.findOne({name:name}, function(err,mymount) {
        if (etat == 'on'){
            mymount.savage = false;
            mymount.save().
            then(console.log('Vous avez recruté '+mymount.name));
        }else if (etat == 'off'){
            mymount.savage = true;
            mymount.save().
            then(console.log('Vous avez recruté '+mymount.name));
        }
    });
};

module.exports = {initMonture,getMonture,getFMonture,upSavageMonture,getLMonture};