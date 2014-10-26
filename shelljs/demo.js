require('shelljs/global');

ls('*.txt').forEach(function (name) {
  console.log('found', name);
});
