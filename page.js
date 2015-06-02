(function(B, _, m, Pikaday, $) {
  var args = Array.prototype.slice.call(arguments);

  args.forEach(function(f) {
    console.log(f.toString(), typeof f);
  });

  $('body').css('background', 'goldenrod');

  console.log('$.cookie exists?', typeof $.cookie === 'function');
})(Backbone, _, moment, Pikaday, jQuery);
