/*<div class="selectbox" data-id="multiselect">
	<div class="box">
		<input type="hidden" name="" value="">
		<span class="title"></span>
	</div>
	<ul class="down">	
		<li data-value=""></li>
	</ul>
</div>*/
jQuery.fn.selectBox = function (){
	all = this;
	$(document).click(function(){
		$(all.selector).find("ul").removeClass();
	});
	this.each(function(){
		dataId = $(this).attr("data-id");
		dataType = $(this).attr("data-type");
		if(dataId == "multiselect"){	
			if ($(this).find('input[type="hidden"]').val() && $(this).find('input[type="hidden"]').val() != "-1") {
				var values = $(this).find('input[type="hidden"]').val().split(',');

				var removeItem = "-1";
				newArray = new Array();
				 jQuery.each(values,function(e, a){
					if(removeItem != a){
		        		newArray.push(a);
		        	}
		    	});
				values = newArray;
				$(this).find('input[type="hidden"]').val(values.join(","))
				$(this).find('.title').html(values.length + " Selecionados");

			}else{
				var values = new Array();
				$(this).find('input[type="hidden"]').val("-1");
			}

			jQuery.each(values, function(e , a){
				$($(this).find('ul li[data-value="'+a+'"]').selector).addClass("selected");
			});
			
			$(this).find(".box").live("click",function(e){
				e.stopImmediatePropagation();
				if($(this).parent().find("ul").hasClass("open")){
					$(this).parent().find("ul").removeClass("open");
				}else{
					all.find("ul").removeClass("open");
					$(this).parent().find("ul").addClass("open");
				}
				
			});

			$(this).find("ul li").live("click",function(e){
				e.stopImmediatePropagation();
				if($(this).attr("data-value") != "-1"){
					if($(this).hasClass("selected")){
						$(this).removeClass("selected");
						values = $(this).closest(all.selector).find('input[type="hidden"]').val().split(',');
						var removeItem = $(this).attr("data-value");
						newArray = new Array();
						 jQuery.each(values,function(e, a){
							if(removeItem != a){
				        		newArray.push(a);
				        	}
				    	});
						values = newArray;
						$(this).parent().find('li[data-value="-1"]').removeClass('selected');
					}else{
						if(values = $(this).closest(all.selector).find('input[type="hidden"]').val() != "-1"){
							values = $(this).closest(all.selector).find('input[type="hidden"]').val().split(',');
						}else{
							values = new Array;
						}
						$(this).addClass("selected");
						values.push($(this).attr("data-value"));
						$(this).parent().find('li[data-value="-1"]').removeClass('selected');
					}
				}else{
					$(this).parent().find('li').removeClass('selected');
					$(this).addClass("selected");
					values = new Array;
					values[0] = "-1";
				}

				if(values.length != 0){
					$(this).parent().parent().find('input[type="hidden"]').val(values.join(","));
					if(values.length == 1){
						$(this).parent().parent().find('.title').html(values.length+" Selecionado");
					}else{
						$(this).parent().parent().find('.title').html(values.length+" Selecionados");
					}
					
				}else{
					$(this).parent().parent().find('.title').html("Selecione");
					$(this).parent().parent().find('input[type="hidden"]').val("-1");
				}
				

			});

			

		}else{
			if ($(this).find('input[type="hidden"]').val() && $(this).find('input[type="hidden"]').val() != "-1") {
				var value = $(this).find('input[type="hidden"]').val();
				$(this).find(".box .title").html($(this).find("ul li[data-value='"+value+"']").html());
			}else{
				var value = "";
				$(this).find('input[type="hidden"]').val("-1");
			}
			

			$(this).find('ul li[data-value="'+value+'"]').addClass("selected");

			$(this).find(".box").live("click",function(e){
				e.stopImmediatePropagation()
				if($(this).parent().find("ul").hasClass("open")){
					$(this).parent().find("ul").removeClass("open");
				}else{
					all.find("ul").removeClass("open");
					$(this).parent().find("ul").addClass("open");
				}
				
			});

			$(this).find("ul li").live("click",function(){
				$(this).parent().parent().find("ul").removeClass("open");

				if($(this).hasClass("selected")){
					$(this).removeClass("selected");
					value == "";
				}else{
					$(this).parent().parent().find("ul li").removeClass("selected");
					$(this).addClass("selected");
					value = $(this).attr("data-value");
					var label = $(this).html();
				}

				if(value != ""){
					$(this).parent().parent().find('input[type="hidden"]').val(value);
					$(this).parent().parent().find('.title').html(label);
				}else{
					$(this).parent().parent().find('.title').html("Selecione");
					$(this).parent().parent().find('input[type="hidden"]').val("-1");
				}
				

			});
		}
	});
};

$(".selectbox").selectBox();
