var deps = {
  backbone: Backbone,
  undersore: _,
  moment: moment,
  pikaday: Pikaday,
  jquery: jQuery
};
var libNames = Object.keys(deps);

libNames.forEach(function(libName) {
  console.log('%s LOADED!!', libName, typeof deps[libName]);
});

$('body').css('background', 'goldenrod');
console.log('$.cookie exists?', typeof $.cookie === 'function');
