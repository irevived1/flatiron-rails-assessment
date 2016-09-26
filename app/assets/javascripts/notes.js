var data;
var subid, noteid;

function setdata(tmp) {
  data = tmp;
}

function ajaxcall() {
  $.getJSON(window.location.href , function(data){
    $('#notes').html('');
    data.forEach(function (obj) {
      $('#notes').prepend(viewnote(obj));
    });
  addListeners();
  });
}

function addListeners() {
  $('#notes a.impo').each(function (index) {
    $(this).on('click', function (e) {
      fill_in_form($(this));
    });
  });
 $('.newnote').on('click', function (e) {
   resetpopup();
  });

  $('#updatebtn').on('click', function (e) {
    if ( subid && noteid ) {
      $.ajax({
        url: '/subjects/' + subid + '/notes/' + noteid,
        type: 'PATCH',
        dataType: 'json',
        data: $('form').serialize() ,
        success: function (data) {
          debugger;
        }
      });
    } else {
      var newnote = $.post('/notes/new',$('form').serialize());
      newnote.done(function(data){
        //add new note here;
        $('#notes').prepend(viewnote(data));
      });
    }
    e.preventDefault();
  });
}

function fill_in_form(obj) {
  $.getJSON('/notes/'+obj.data('id'),function(data) {
    $('#note_name').val(data.name);
    $('#note_subject_attributes_name').val(data.subject.name);
    $('#note_content').val(data.content);
    $('#updatebtn').val('Update Note');
    subid = data.subject.id;
    noteid = data.id
  
    $('#deletebtn').remove();
    $('#updatebtn').after(' <a id="deletebtn" data-confirm="Are you sure?" class="btn btn-danger" rel="nofollow" data-method="delete" href="/subjects/3/notes/1">Delete</a>');
  });
}

function resetpopup() {
  $('#note_name').val('');
  $('#note_subject_attributes_name').val($('#note_subject_attributes_name').data('subject'));
  $('#note_content').val('');
  $('#updatebtn').val('Create Note');
  noteid = undefined;
  subid = undefined;
  $('#deletebtn').remove();
}


$(function () {
  ajaxcall();
});
