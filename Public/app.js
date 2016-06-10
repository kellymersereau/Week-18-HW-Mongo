
	$.getJSON('/articles', function(data){
		for(var i=0; i<data.length; i++){
			$('#articles').append('<h5 class="condensed thin center" id="' + data[i].title + '">' + data[i].title +  '</h5> <p class="condensed thin" data-id="' + data[i]._id + '">' + data[i].body + '</p> <a href="' + data[i].link + '" class="waves-effect waves-light btn center thin black lighten-1"> Read More </a>  <button id="addNote" data-id="' + data[i]._id + '"class="waves-effect waves-light btn right thin black lighten-1"> Add Note </button> <br>');
		}
	});

	$(document).on('click', '#addNote', function(){
	  $('#notes').empty();
	  var thisId = $(this).attr('data-id');

	  $.ajax({
	    method: "GET",
	    url: "/articles/" + thisId,
	  })
	    .done(function( data ) {
	      console.log(data);
	      $('#notes').append('<h5 class="center thin">' + data.title + '</h5>');
	      $('#notes').append('<input id="titleinput" name="title" placeholder="Title">');
	      $('#notes').append('<textarea id="bodyinput" name="body" placeholder="Add notes"></textarea>');
	      $('#notes').append('<button data-id="' + data._id + '" id="savenote" class="waves-effect waves-light btn center thin indigo lighten-3">Save Note</button>');

	      if(data.note){
	        $('#titleinput').val(data.note.title);
	        $('#bodyinput').val(data.note.body);
	      }
	    });
	});

	$(document).on('click', '#savenote', function(){
	  var thisId = $(this).attr('data-id');

	  $.ajax({
	    method: "POST",
	    url: "/articles/" + thisId,
	    data: {
	      title: $('#titleinput').val(),
	      body: $('#bodyinput').val()
	    }
	  })
	    .done(function( data ) {
	      console.log(data);
	      $('#notes').empty();
	    });


	  $('#titleinput').val("");
	  $('#bodyinput').val("");
	});

