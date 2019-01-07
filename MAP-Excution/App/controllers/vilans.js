const {Vilan} = require ('../models/vilans');
//objet avec getteur accesseur
var initVilan = (name,hp,damage,city,reward) => {
            return new Vilan({
                name,
                hp,
                damage,
                city,
                reward,
                etat : 1
            }).save();
};

const getVilan = (name,callback) => {
    Vilan.findOne({"name":name})
        .then(vilan => {
            if (vilan) {
                callback(vilan);
            }else{
                console.log("Hero not born yet !")
            }
        })
        .catch(err => console.log(err));
};

module.exports = {initVilan,getVilan};
