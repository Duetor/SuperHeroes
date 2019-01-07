const {Hero} = require ('../models/heros');

const initHero = (name,hp,damage,cost) => {
    return new Hero ({
        name,
        hp,
        damage,
        position_x:0,
        position_y:0,
        cost,
        mount:'',
        service : false,
        etat : 1
    }).save();
};

const getHero = (name,callback) => {
    Hero.findOne({"name":name})
        .then(hero => {
        if (hero) {
            callback(hero);
        }else{
            console.log("Hero not born yet !")
        }
    })
        .catch(err => console.log(err));
};

const getFHero = (cash,callback) => {
    Hero.findOne({"service":false}).
    where("cost").lte(cash)
        .then(hero => {
            if (hero) {
                callback(hero);
            }
        });
};
const getRHero = (callback) => {
    Hero.findOne({"service":true}).
    where("mount").ne("")
        .then(hero => {
            if (hero) {
                callback(hero);
            }
        });
};
const getTHero = (callback) => {
    Hero.findOne({"service":true})
        .then(hero => {
            if (hero) {
                callback(hero);
            }
        });
};

const upServiceHero = (name,etat) => {
    Hero.findOne({name:name}, function(err,thishero) {
        if (etat == 'on'){
            thishero.service = true;
            thishero.save().then(console.log('Vous avez recruter un nouvel héros : '+thishero.name));
        }
    });
};

module.exports = {initHero,getHero,upServiceHero,getFHero,getRHero,getTHero};