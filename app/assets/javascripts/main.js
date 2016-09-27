//smooth scrolling
function jump(h){
  $('html, body').animate({
    scrollTop: $('#'+h).offset().top
  }, 750);
}

function capitalizeEachWord(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function viewnote(data) {
  return '<div id="'+ data.id + '"> <div class="page-header"> \
    <h1 >' + data.name + '</h1> \
  </div> \
  <dl class="dl-horizontal"> \
    <dt><strong>Name:</strong></dt> \
    <dd><a class="impo" href="#" data-toggle="modal" data-target="#myModal"  data-id="' + data.id + '" >' + data.name + '</a></dd> \
    <dt><strong>Subject:</strong></dt> \
    <dd><a class="subj" href="/subjects/' + data.subject.id + '">' + capitalizeEachWord(data.subject.name) + '</a></dd> \
    <dt><strong>Content:</strong></dt> \
    <dd class="cont">' + data.content + '</dd \
  </dl></div>'
}

function ttips() {

  if ($('#note_name').val() == "") {
    $('#note_name').tooltip({'placement':'bottom', 'title': 'Name cannot be blank!'}).tooltip('show');
  }
  if ($('#note_subject_attributes_name').val() == "") {
    $('#note_subject_attributes_name').tooltip({'placement':'bottom', 'title': 'Subject name cannot be blank!'}).tooltip('show');
  }
  if ($('#note_content').val() == "") {
    $('#note_content').tooltip({'placement':'bottom', 'title': 'Content cannot be blank!'}).tooltip('show');
  }
}

function hidemodal() {
  $('#myModal').modal('hide');
}
