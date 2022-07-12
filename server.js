
const { app } = require('./app');   

//utils
const { db } = require('./utils/database.util');

//models

const { Game} = require('./models/games.model')
const {Console} = require('./models/consoles.model')
const { Review} = require('./models/reviews.model')
const {User} = require('./models/users.model')





db.authenticate()
    .then(() => console.log("db auntheticated"))



   /* Un usuario puede tener muchas review y cada review pertenece a un usuario */
   User.hasMany(Review, {foreignKey: 'userId'});
   Review.belongsTo(User);

   /* Un juego puede tener muchas review  pero cada review pertenece a un juego*/
   Game.hasMany(Review,{ foreignKey: 'gameId'});
   Review.belongsTo(Game)

   /* Un juego puede pertenecer a muchas consolas diferente */



 db.sync() 
    .then(() => console.log("db sync")) 
    .catch(err => console.log(err));


app.listen(4001, () => {
    console.log("game store working")
    
});