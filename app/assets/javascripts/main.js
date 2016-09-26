function capitalizeEachWord(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function viewnote(data) {
  return ' <div class="page-header"> \
    <h1 >' + data.name + '</h1> \
  </div> \
  <dl class="dl-horizontal"> \
    <dt><strong>Name:</strong></dt> \
    <dd><a class="impo" href="#" data-toggle="modal" data-target="#myModal"  data-id="' + data.id + '" >' + data.name + '</a></dd> \
    <dt><strong>Subject:</strong></dt> \
    <dd><a href="/subjects/' + data.subject.id + '">' + capitalizeEachWord(data.subject.name) + '</a></dd> \
    <dt><strong>Content:</strong></dt> \
    <dd>' + data.content + '</dd \
  </dl>'
}
