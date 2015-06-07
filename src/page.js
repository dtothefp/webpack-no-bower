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
  console.log('%c %s %s LOADED!!', 'background: #222; color: #bada55', libName, typeof deps[libName]);
});

$('body').css('background', 'goldenrod');
console.log('%c $.cookie exists?: %s', 'background: #222; color: #bada55', typeof $.cookie === 'function');
