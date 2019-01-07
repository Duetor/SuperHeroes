const {Base} = require ('../models/bases');
const {City} = require ('../models/citys');
const{Hero} = require ('../models/heros');
const {upServiceHero,getFHero,getHero} = require('./heros');
const {getFMonture,upSavageMonture} = require('./montures');


const initBase = (name,money) => {
    return new Base ({
        name,
        position_x : 0,
        position_y:0,
        licorn:1,
        poney:0,
        money,
        heroList:false,
        etat : 0
    }).save();
};


const getBase = (name,callback) => {
    Base.findOne({"name":name})
        .then(base => {
            if (base)
                callback(base);
        });
};

const iSeeU = (callback) => {
    City.findOne({"vilan": true })
        .then(city => {
            if (city) {
                callback(city);
            }
        })
};

const buyHero = (name,callback) => {
    getBase(name,function (base) {
       getFHero(5000,function(thishero) {
            if (thishero){
                base.money=base.money-thishero.cost;
                base.save().
                then(upServiceHero(thishero.name,"on")).
                then(() => getHero(thishero.name, function(hero){
                    callback(hero);
                }));
            }else console.log('Vous etes trop pauvre pour recruter un Heros');
        });
    })
};

const catchMonture = (name,callback) => {
    getBase(name,function (base) {
        getFMonture(function(mymount) {
            if (mymount){
                if(mymount.state == 'licorn'){
                    base.licorn++;
                    base.save().
                        then(upSavageMonture(mymount.name,"on")).
                        then(() => getMonture(mymount.name,function (monture) {
                        console.log(monture);
                    }));
                }
                else if (mymount.state == 'poney') {
                    base.poney++;
                    base.save().
                        then(upSavageMonture(mymount.name,"on")).
                        then(() => getMonture(mymount.name,function (monture) {
                        console.log(monture);
                    }));
                }
            }else console.log('Vous n avez pas trouvez de poney dans la nature !');
        });
    })
};

const upList = (name) => {
    Base.findOne({name:name}, function(err,mybase) {
            mybase.heroList = true;
        mybase.save();
    });
};

module.exports = {initBase,getBase,iSeeU,buyHero,upList,catchMonture};