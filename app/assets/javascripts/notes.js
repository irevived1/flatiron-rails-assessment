var data;
var subid, noteid;

function setdata(tmp) {
  data = tmp;
}

function ajaxcall() {
  $.getJSON(window.location.href , function(data){
    $('#notes').html('');
    $('#notes').hide();
    data.forEach(function (obj) {
      $('#notes').prepend(viewnote(obj));
    });
    $('#notes').animate({ "height": "toggle", "opacity": "toggle" },1500);
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
          //update note here;
          $('#'+data.id + ' h1').text(data.name);
          $('#'+data.id + ' .impo').text(data.name);
          $('#'+data.id + ' .subj').text(capitalizeEachWord(data.subject.name));
          $('#'+data.id + ' .cont').text(data.content);
          $('#'+data.id).animate({
              "font-size":"1.2em"
            },250);
          $('#'+data.id).animate({
              "font-size":"1em"
            },250);
        }
      });
    } else {
      var newnote = $.post('/notes/new',$('form').serialize());
      newnote.done(function(data){
        //add new note here;
        $('#notes').prepend(viewnote(data));
        //add listener on it too
        $('#'+data.id).hide();
        $('#'+data.id).animate({ "height": "toggle", "opacity": "toggle" },500);
        $('#'+data.id+' a.impo').on('click', function (e) {
          fill_in_form($(this));
        });

      });
    }
    // e.preventDefault();
  });


  $(document).delegate('#deletebtn','click', function (e) {
    $.ajax({
      url: '/subjects/' + subid + '/notes/' + noteid,
      type: 'DELETE',
      dataType: 'json',
      complete: function (jqXHR, textStatus) {
      },
      success: function (data, textStatus, jqXHR) {
        $('#'+noteid).animate({ "height": "toggle", "opacity": "toggle" },500, function(){$(this).remove();});
        // $('#'+noteid).remove();
      }
    })
  });

  $('.myanchor').on('click', function (e) {
    jump('toptop');
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
    $('#updatebtn').after(' <a id="deletebtn" data-confirm="Are you sure?" data-dismiss="modal" class="btn btn-danger" rel="nofollow">Delete</a>');
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

//smooth scrolling
function jump(h){
  $('html, body').animate({
    scrollTop: $('#'+h).offset().top
  }, 1000);
}

$(function () {
  ajaxcall();
});
