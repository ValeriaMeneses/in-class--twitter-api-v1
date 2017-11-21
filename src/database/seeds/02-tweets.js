const dataRows = [{
  description: 'Essential Image Optimization: my new eBook on image best practices!',
  likes: '2400',
  retweets: '1000',
  profileId: 1
}];

exports.seed = function(knex, Promise) {
  return knex('tweet')
    .del()
    .then(() => {
      return knex('tweet')
        .insert(dataRows);
    })
}
