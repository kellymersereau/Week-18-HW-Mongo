
	$.getJSON('/articles/vice', function(data){
		for(var i=0; i<data.length; i++){
			$('#articles').append('<h5 class="condensed thin" id="' + data[i].title + '">' + data[i].title +  '</h5> <br> <p class="condensed thin" id="' + data[i]._id + '">' + data[i].body + '</p> <br> <a href="' + data[i].link + '" class="waves-effect waves-light btn center thin"> Read More </a>');
		}
	});
