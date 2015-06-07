var deps = {
  backbone: Backbone,
  undersore: _,
  moment: moment,
  pikaday: Pikaday,
  jquery: jQuery,
  oform: Oform
};
var libNames = Object.keys(deps);

libNames.forEach(function(libName) {
  console.log('%s LOADED!!', libName, typeof deps[libName]);
});

$('body').css('background', 'goldenrod');
console.log('$.cookie exists?', typeof $.cookie === 'function');
