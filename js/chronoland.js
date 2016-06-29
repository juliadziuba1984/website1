var map_instances = [];






/*-------------------popup init-------------------*/
function InitPopup(popup){
	popup = $(popup);
	var cls = popup.attr('data-popup');
	$('.custom-popup.'+cls).fadeIn('300');
	$('.custom-popup.'+cls).prev('.custom-overlay').fadeIn('300');


		
}
/*-------------------end popup init-------------------*/


/*-------------ALIGN POPUPS-------------------------*/
function AlignPopup(){
	$('.custom-popup').each(function(){
		if($(this).outerWidth() > $(window).width() && $(this).outerHeight()+80 > $(window).height()) {
			$(this).css({
				"position": "absolute",
				"top": $(window).scrollTop() + 50 + "px",
				'left': '10px'
			});
		}
		
		else if($(this).outerHeight()+80 > $(window).height()) {
			$(this).css({
				"position": "absolute",
				"top": $(window).scrollTop() + 50 + "px",
				'left': ($(window).width()-$(this).outerWidth())/ 2 + 'px'
			});
		}
		
		else if($(this).outerWidth() > $(window).width()) {
			$(this).css({
				"position": "absolute",
				"top": $(window).scrollTop() + 50 + "px",
				'left': '10px'
			});
		}
		
		else {
			$(this).css('top',($(window).height()-$(this).outerHeight())/ 2 + 'px');
			$(this).css('left',($(window).width()-$(this).outerWidth())/ 2 + 'px');
			$(this).css('position', 'fixed');	
		}
	});
	
	
	
	
	
	
	if(navigator.userAgent.match(/Android/i) ||
		navigator.userAgent.match(/webOS/i)||
		navigator.userAgent.match(/iPhone/i) ||
		navigator.userAgent.match(/iPod/i) ||
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/Blackberry/i) )
    {
	$('.custom-popup').addClass('mobilepopup');
		
	$('.custom-popup').each(function(){
		if($(this).outerWidth() > $(window).width() && $(this).outerHeight()+80 > $(window).height()) {
			$(this).css({
				"position": "absolute",
				"top": $(window).scrollTop() + 50 + "px",
				'left': '10px'
			});
		}
		
		else if($(this).outerHeight()+80 > $(window).height()) {
			$(this).css({
				"position": "absolute",
				"top": $(window).scrollTop() + 50 + "px",
				'left': ($(window).width()-$(this).outerWidth())/ 2 + 'px'
			});
		}
		
		else if($(this).outerWidth() > $(window).width()) {
			$(this).css({
				"position": "absolute",
				"top": $(window).scrollTop() + 50 + "px",
				'left': '10px'
			});
		}
		
		else {
			$(this).css('top',($(window).height()-$(this).outerHeight())/ 2 + 'px');
			$(this).css('left',($(window).width()-$(this).outerWidth())/ 2 + 'px');
			$(this).css('position', 'absolute');	
		}
	});
	}
}
/*-------------END ALIGN POPUPS-------------------------*/






/*-------------read more content*/
function showMoreContent() {
	
	$('.comments_block .block .text').each(function(){
		if($(this).innerHeight()<="100"){
		$(this).parent().parent().find('.btn_read_more').css('display','none');
		$(this).parent().parent().find('.text_holder').css('height','auto');
		}
	})
	
	$('.js_read_more').click(function(e){
		e.preventDefault();	
		e.stopPropagation();
		if($(this).hasClass('active')){
			$(this).parent().find('.text_holder').animate({height: "100px"}, 500)
			$(this).removeClass('active');
		}
		else {
			var height = $(this).parent().find('.text').innerHeight();
			$(this).parent().find('.text_holder').animate({height: height+"px"}, 500)
			$(this).addClass('active');
		}
		
	});
	
}
/*-------------end read more content*/




/*-------------Tabs-------------------*/
function initTabs() {
    var isAnimating = false;
    $('[data-tab]').click(function(e) {
         e.preventDefault();
		$('.js_announce').fadeOut();
        if(!isAnimating) {
            var parent = $(this).parent().parent();
            var cls = $(this).attr('data-tab');
            isAnimating = true;
            $('[data-tab]', parent).removeClass('active');
            $(this, parent).addClass('active');

            if($('.hidden_content').hasClass('active')){
                $('.hidden_content.active', parent).fadeOut(300, function(){
                    $('.hidden_content.active', parent).removeClass('active');
                    $('.hidden_content'+'#'+cls, parent).fadeIn(300, function() {
                        isAnimating = false;
                    });  
                    $('.hidden_content'+'#'+cls, parent).addClass('active');
                    
					for(var i = 0; i < map_instances.length; i++) {
						google.maps.event.trigger(map_instances[i].map, 'resize');
						map_instances[i].map.setCenter(map_instances[i].center);
					}
				 })
            }
            else {
                $('.hidden_content'+'#'+cls, parent).fadeIn(300, function() {
                    isAnimating = false;
                }); 
                $('.hidden_content'+'#'+cls, parent).addClass('active');
            }
        }

    });
	$('.hidden_content.active').fadeIn();	
}
/*-------------end Tabs-------------------*/


/*-------------remove input placeholders on click*/
function ClearPlaceholder(){
	$('input,textarea').focus(function(){
		 $(this).data('placeholder',$(this).attr('placeholder'))
		 $(this).attr('placeholder','');
	});
	$('input,textarea').blur(function(){
		 $(this).attr('placeholder',$(this).data('placeholder'));
	});
}
/*-------------end remove placeholders on click*/



/*-------------custom input type file*/
function ChooseFile(){
	if($('.js_file_input').val()!=""){
		$('.js_file_value').html($('.js_file_input').val());
		$('.js_remove_file').css('display', 'block');
		$('.file_name_holder').css('display', 'inline-block');
		$('.input_file_name_holder').css('display', 'inline-block');
	}
}
/*-------------end custom input type file*/


function checkHeight() {
	if ($('#items_of_brand').length > 0) {
		offsetTop = $('#items_of_brand').offset().top;
		//alert(offsetTop);
		//alert($(window).height());
		if ($(window).height() - $('#items_of_brand').height()+$('.brand_detail_block .text_block').height()+20 < offsetTop) {
			$('.btn_view_brand_items').css('display','block');
		}
		else {
			$('.btn_view_brand_items').css('display','none');
		}
	}
}


$( window ).resize(function() {
	AlignPopup();
	for(var i = 0; i < map_instances.length; i++) {
		google.maps.event.trigger(map_instances[i].map, 'resize');
		map_instances[i].map.setCenter(map_instances[i].center);
	}
	
	checkHeight();
});	


$(window).scroll(function() {
	var scrolled_top = $(window).scrollTop();
});

function initFavorites(){
    $('.icon_add_to_favorite').each(function(){
        var element = $(this);
        
        element.on('click', function(){
            element.toggleClass('active');
        });
    });
}


	
var openFile = function(event) {
	var input = event.target;
	
	var reader = new FileReader();
	reader.onload = function(){
	  var dataURL = reader.result;
	  var output = document.getElementById('preview');
	  output.src = dataURL;
	};
	reader.readAsDataURL(input.files[0]);
};

$(document).ready(function(){
	AlignPopup();
	showMoreContent();
	initTabs();
	ClearPlaceholder();
	checkHeight();
 initFavorites();

/*-------------input type file*/
$('.js_file_input').change(function(){
	   ChooseFile();
});
/*-------------end input type file*/


/*-------------empty form file input*/
$('.js_remove_file').click(function(e){
	 e.preventDefault();		
	 $(this).parent().parent().find('.js_file_value').empty();	
	 $(this).parent().parent().find('.js_file_input').val("");	
	 $('.js_remove_file').css('display', 'none');
	 $('.file_name_holder').css('display', 'none');
});	
/*-------------end empty form file input*/

/*-------------Revealing list click-----------------*/
	$('.js_holder.active').find('.js_block').css('display', 'block');
	$('.js_heading').click(function(e){
		e.preventDefault();
		//$('.js_block').slideUp();
		//$('.js_holder.active').removeClass('active');
	 	if($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
			$(this).parent().find('.js_block').slideUp();
			
		 }
		 else{
			$(this).parent().addClass('active');
			$(this).parent().find('.js_block').slideDown();
		 }
	});	
		
/*-------------end Revealing list click-----------------*/		
	
	
	
/*-------------scroll to some block*/	
	$('.js_scroll').click(function(e){
		e.preventDefault();
		var href = $(this).attr('href');
		$('body').scrollTo(href, {duration:'slow'});						  
	})
/*-------------end scroll to some block*/	




/*-------------input mask*/
	$(".js_phone_mask").mask("+7 (999) 999-99-99");
/*-------------end input mask*/


/*-------------custom select-------------------*/
	$('.js_select select').styler({
		selectSearch:false
		/*onSelectOpened: function() {
		 $(this).find(".jq-selectbox__dropdown ul").jScrollPane({
				showArrows: false,
				verticalDragMinHeight: 28,
				verticalDragMaxHeight: 28,
				horizontalDragMinWidth: 28,
				horizontalDragMaxWidth: 28
		});
 }*/
});
/*-------------custom select-------------------*/



/*-------------POPUP-------------------------*/
    $('[data-popup]').on('click', function(e){
        e.preventDefault();
		AlignPopup();
		InitPopup($(this));
   });


    $('.custom-overlay, .custom-popup .close, .js_close_popup').on('click',function(e){
		e.preventDefault();	
		$('.custom-overlay').delay(200).fadeOut('300');																		  
		$('.custom-popup').fadeOut('300');	
		
    });
/*-------------END POPUP----------------------------*/




$('.js_slide_link').click(function(){
	$('.js_slide_link').removeClass('active');
	var index = $(this).index()+1;
	$(this).addClass('active');
	
	$('.slide_block.active').fadeOut(300, function(){
									
	})	
	$('.slide_block:nth-child('+index+')').delay(300).fadeIn(300, function(){
		$('.slide_block:nth-child('+index+')').addClass('active');																		   
	});
			
	
})


/*$('.js_subscribe').click(function(e){
		e.preventDefault();
		var form = $(this).closest('form');
		var height = form.innerHeight();
		var message_block = form.parent().find('.js_hidden_form_message_block');
		message_block.find('.inner').css('height',height+'px');
		form.fadeOut(300, function(){
			message_block.fadeIn();	
			message_block.css('display', 'table');
		})
		return false;
	})
*/

$('.js_btn_filter').click(function(e){
		e.preventDefault();
		$('.js_catalog_filter_block').toggle();
		$('.page').css('display','none');
})

$('.js_icon_btn_filter_close').click(function(e){
		e.preventDefault();
		$('.js_catalog_filter_block').toggle();
		$('.page').css('display','block');
})
$('.js_btn_menu').click(function(e){
		e.preventDefault();
		if($(this).hasClass('active')){
			$(this).toggleClass('active');
			$('.js_menu_block').toggle();
			$('.page').css('overflow','visible');
			$('.page').css('height','auto');
			$('.header').css('z-index','10001');
			$('.header').css('background-color','#fff');
			$('.js_icon_site_search').css('display','none');
			
		}
		else{
		$(this).toggleClass('active');
		$('.js_menu_block').toggle();
		$('.page').css('overflow','hidden');
		$('.page').css('height','100px');
		$('.header').css('z-index','10001');
		$('.header').css('background-color','transparent');
		$('.js_icon_site_search').css('display','block');
		
		}
		
		
		
})
$('.js_link_menu').click(function(e){
		e.preventDefault();
		$(this).parent().find('.js_submenu_block').slideToggle();
		$(this).toggleClass('active');
})


$('.block_city_select select').change(function(){
            var block = $('.sidebar-contacts'), index = $('.block_city_select option:selected').val();
            $('.sidebar-contacts_phones').hide().eq(index).show();
    });
	var index = $('.block_city_select option:selected').val();
	$('.sidebar-contacts_phones').eq(index).show();


var footer_height = $('.footer_holder').innerHeight();
$('.header_and_content_holder').css('padding-bottom',footer_height+55+'px');

/*-------------validation-------------------*/
	$.validate({
	  form : '.js_validation',
	  /*onError : function() {
            alert('Validation failed');
        },*/
		onSuccess : function() {
			$('.js_validation').fadeOut(300, function(){
				$('.js_hidden_form_message_block').fadeIn();		  
			});
		  
		   return false;
        }
		
        /*onValidate : function() {
           
               
			
            
        }*/
	});
	

/*-------------end validation-------------------*/	
});