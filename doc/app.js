require(["docson", "lib/jquery"], function(docson) {
  $(function () {
    $.get($('#doc').attr("schema"))
        .done(function(result) {
          docson.doc("doc", result);
        });
  });
});
