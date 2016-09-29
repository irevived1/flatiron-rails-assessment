var data;
var subid, noteid;

// function setdata(tmp) {
//   data = tmp;
// }

function ajaxcall() {
  showLoading();
  $.getJSON(window.location.href , function(data){
    $('#notes').html('');
    $('#notes').hide();
    data.forEach(function (obj) {
      $('#notes').prepend(viewnote(obj));
    });
    $('#notes').animate({ "height": "toggle", "opacity": "toggle" },1500);
    addListeners();
    hideLoading();
  });
}

function Content (str) {
  this.content = str;
}

Content.prototype.wordCount  = function (str) {
  if (str) {
    return str.split(/\s+/).length;
  } else {
    return this.str.split(' ').length;
  }
};

var counter = new Content('holder');

function addListeners() {
  $('#updatebtn').attr("onclick","return false");
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
        // e.preventDefault();
          hidemodal();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // error callback
          ttips();
        }
      });
    } else {
      $.ajax({
        url: '/notes/new',
        type: 'POST',
        dataType: 'json',
        data: $('form').serialize(),
        success: function (data) {
          //add new note here;
          $('#notes').prepend(viewnote(data));
          //add listener on it too
          $('#'+data.id).hide();
          $('#'+data.id).animate({ "height": "toggle", "opacity": "toggle" },500);
          $('#'+data.id+' a.impo').on('click', function (e) {
            fill_in_form($(this));
          });
          hidemodal();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // error callback
          ttips();
        }
      });
    }
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

  // textarea listener
  $("textarea").on('change keyup paste', function() {
    if ($("textarea").val() == '' ) {
      $('#wordcount').text('');
      return;
    }
    var tmp = counter.wordCount(($("textarea").val()));
    $('#wordcount').text( tmp + ' word(s)');
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

$(function () {
  ajaxcall();
});
