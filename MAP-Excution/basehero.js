const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const {Hero} = require ('./App/models/heros');
const {initHero,getRHero,getTHero} = require('./App/controllers/heros');
const {initBase,getBase,iSeeU,buyHero,upList,catchMonture} = require('./App/controllers/bases');
const {initCity,upCity} = require('./App/controllers/citys');
const {initMonture,getLMonture} = require('./App/controllers/montures');
const {initVilan} = require('./App/controllers/vilans');

const intro = "Vous venez d'être nommé a la tête d'une toute nouvelle institution qui lutte contre le crime ...";
const pCity = "Gotham";

var mongoDB = 'mongodb://hero:0hero!@ds149914.mlab.com:49914/superhero_library';
mongoose.connect(mongoDB,  {useNewUrlParser: true });
var db = mongoose.connection;

const initMap = () => {
  initBase('Le QG',5000).then(console.log(intro));
  initCity(pCity,5,-8).then(console.log('Vous êtes maintenant responsable du maintient de l ordre a '+pCity));
  initHero('Barman',16000,1300,1000);
  initMonture('Dorot','licorn',100,"",true);
  initMonture('Henry','licorn',100,"",false);
};

const spawnVilain = (name,mycity) => {
  initVilan(name,5000,500,mycity,1500)
    .then(console.log(name+' est apparu dans les rues de '+ mycity +' !')).
  then(upCity(mycity));

};

const test = (a,b,c,d,nom,ville) => {
  if(a === b && c === d) {
    console.log(nom+" est arrivé a "+ville);
  }
};

const coursForest = async () => {
  iSeeU(function (city) {
    getRHero( function (hero) {
      if (hero.position_x == city.position_x && hero.position_y == city.position_y) {
        var err = new Error('');
        err.break = true;
        //console.log(hero.name +" est arrivé a "+ city.name);
        return ;
      }
      if (city.position_x == hero.position_x) {
        if (city.position_y < hero.position_y) {
          console.log('il galope ...');
          hero.position_y = hero.position_y - 1;
          hero.save().then(test(hero.position_x, city.position_x, hero.position_y, city.position_y,hero.name,city.name));
        } else if (city.position_y > hero.position_y){
          console.log('il galope ...');
          hero.position_y = hero.position_y + 1;
          hero.save().then(test(hero.position_x, city.position_x, hero.position_y, city.position_y,hero.name,city.name));
        }
      }

      if (city.position_x < hero.position_x) {

        if (city.position_y < hero.position_y) {
          console.log('il galope ...');
          hero.position_y = hero.position_y + 1;
          hero.position_x = hero.position_x - 1;
          hero.save().then(test(hero.position_x, city.position_x, hero.position_y, city.position_y,hero.name,city.name));

        } else if (city.position_y > hero.position_y) {
          console.log('il galope ...');
          hero.position_y = hero.position_y + 1;
          hero.position_x = hero.position_x - 1;
          hero.save().then(test(hero.position_x, city.position_x, hero.position_y, city.position_y,hero.name,city.name));
        } else {
          console.log('il galope ...');
          hero.position_x = hero.position_x - 1;
          hero.save().then(test(hero.position_x, city.position_x, hero.position_y, city.position_y,hero.name,city.name));
        }
      }

      if (city.position_x > hero.position_x) {
        if (city.position_y < hero.position_y) {
          console.log('il galope ...');
          hero.position_y = hero.position_y - 1;
          hero.position_x = hero.position_x + 1;
          hero.save().then(test(hero.position_x, city.position_x, hero.position_y, city.position_y,hero.name,city.name));
        } else if (city.position_y > hero.position_y) {
          console.log('il galope ...');
          hero.position_y = hero.position_y + 1;
          hero.position_x = hero.position_x + 1;
          hero.save().then(test(hero.position_x, city.position_x, hero.position_y, city.position_y,hero.name,city.name));
        } else {
          console.log('il galope ...');
          hero.position_x = hero.position_x + 1;
          hero.save().then(test(hero.position_x, city.position_x, hero.position_y, city.position_y,hero.name,city.name));
        }
      }
    })
  })
};

const callStable = (base,lehero,callback) => {
  if(base.poney == 0 && base.licorn == 0) {
    catchMonture('Le QG', trouvaille => {
      if(trouvaille) {
        lehero.mount = trouvaille.state;
        trouvaille.master = lehero.name;
        lehero.save();
        trouvaille.save().then(console.log(lehero.name + "s'equipe  de sa nouvel monture : " + myponey.name));
        callback(lehero);
      }else {
        lehero.mount = 'pied';
        lehero.save();
      }
    })
  }
  if(base.licorn == 0 && base.poney != 0) {
    getLMonture('poney', myponey => {
      if(myponey) {
        lehero.mount = 'poney';
        myponey.master = lehero.name;
        lehero.save();
        myponey.save().then(console.log(lehero.name+"s'equipe  de sa nouvel monture : "+myponey.name));
        callback(lehero);
      }
    })
  }
  if (base.licorn != 0){
    getLMonture('licorn', mylicorn => {
      if(mylicorn) {
        lehero.mount = 'licorn';
        mylicorn.master = lehero.name;
        lehero.save();
        mylicorn.save().then(console.log(lehero.name+" s'equipe  de sa nouvel monture : "+mylicorn.name));
        callback(lehero);
      }
    })
  }
};

const darkSide =  () => {
  spawnVilain('Le Joker',pCity);
};

const whitePowa =  () => {
  iSeeU(function (cityDanger) {
    getBase('Le QG',function(base) {
      if(base.heroList == true){
        buyHero('Le QG', lehero => {
          upList(base.name);
          callStable(base,lehero,function (readyhero) {
            console.log('il se met en route');
            if(readyhero.mount == 'licorn')
              setInterval(coursForest,1000);
            else if (readyhero.mount == 'poney') {
              setInterval(coursForest,2000);
            }else {
              setInterval(coursForest,4000);
            }
          })
        });
      }
      else if (base.heroList == false){
        getTHero(function(nhero) {
          callStable(base,nhero, function (lhero) {
            console.log(nhero);
            if(lhero.mount == 'licorn')
              setInterval(coursForest,1000);
            else if (lhero.mount == 'poney') {
              setInterval(coursForest,2000);
            }else {
              setInterval(coursForest,4000);
            }
          })
        })
      }
    });

  });
};

Hero.deleteMany({"name":"Barman"},function(err) {});
initMap();
darkSide();
whitePowa();


