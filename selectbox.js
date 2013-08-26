/*<div class="selectbox" data-id="multiselect" data-type="hover">
	<input type="hidden" name="" value="">
	<span class="title">Title</span>
	<ul>
		<li data-value="value" class="select">Label</li>
		<li data-value="value" class="">Label</li>
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
			if ($(this).find('input[type="hidden"]').val()) {
				var values = $(this).find('input[type="hidden"]').val().split(',');
				$(this).find('.title').html(values.join(","));
			}else{
				var values = new Array();
			}

			jQuery.each(values, function(e , a){
				$(this).find("ul li[data-value='"+a+"']").addClass("selected");
			});
			
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
				if($(this).hasClass("selected")){
					$(this).removeClass("selected");
					var removeItem = $(this).attr("data-value");
					newArray = new Array();
					 jQuery.each(values,function(e, a){
						if(removeItem != a){
			        		newArray.push(a);
			        	}
			    	});
					values = newArray;
				}else{
					$(this).addClass("selected");
					values.push($(this).attr("data-value"));	
				}

				if(values.length != 0){
					$(this).parent().parent().find('input[type="hidden"]').val(values.join(","));
					if(values.length == 1){
						$(this).parent().parent().find('.title').html(values.length+" Selecionado");
					}else{
						$(this).parent().parent().find('.title').html(values.length+" Selecionados");
					}
					
				}else{
					$(this).parent().parent().find('.title').html("Indiferente");
					$(this).parent().parent().find('input[type="hidden"]').val("");
				}
				

			});
		}else{
			if ($(this).find('input[type="hidden"]').val()) {
				var value = $(this).find('input[type="hidden"]').val();
			}else{
				var value = "";
			}
			
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
					$(this).parent().parent().find('.title').html("Indiferente");
					$(this).parent().parent().find('input[type="hidden"]').val("");
				}
				

			});
		}
	});
};

$(".selectbox").selectBox();
