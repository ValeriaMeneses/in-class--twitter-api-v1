const dataRows = [{
  username: '@addyOsmani',
  name: 'Addy Osmani',
  profileUrl: 'https://pbs.twimg.com/profile_images/929541626292301825/vYxUzIes_400x400.jpg'
}];

exports.seed = function(knex, Promise) {
  return knex('profile')
    .del()
    .then(() => {
      return knex('profile')
        .insert(dataRows);
    });
}
