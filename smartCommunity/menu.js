$(function(){
  var menuwidth  = 110; 
  var menuspeed  = 100;
  var $bdy       = $('body');
  var $container = $('.mobile');
  var $burger    = $('#m_menu');
  var negwidth   = "-"+menuwidth+"px";
  var poswidth   = menuwidth+"px";
  var $_h_menu = $('.h_menu');
  var $_menu_list = $('.menu_list');
  $('.menu').on('click',function(e){
    $_h_menu.css('display', 'block');
	$_menu_list.css('display', 'block');
  });
  $('.overlay').on('click', function(e){
    if($bdy.hasClass('openmenu')) {
      jsAnimateMenu('close');
    }
  });
  function jsAnimateMenu(tog) {
    if(tog == 'open') {
      $bdy.addClass('openmenu');
      
      $container.animate({marginRight: negwidth, marginLeft: poswidth}, menuspeed);
      $burger.animate({width: poswidth}, menuspeed);
      $('.overlay').animate({left: poswidth}, menuspeed);
    }
    if(tog == 'close') {
      $bdy.removeClass('openmenu');
      
      $container.animate({marginRight: "0", marginLeft: "0"}, menuspeed);
      $burger.animate({width: "0"}, menuspeed);
      $('.overlay').animate({left: "0"}, menuspeed);
    }
  }
});