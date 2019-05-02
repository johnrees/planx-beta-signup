// const URL =
//   "https://script.google.com/macros/s/AKfycbwT_FNQfkN9vJfZnIMkN273_ethCsO5TRPwnI-f8CFnACMFdv8/exec";
// const URL = "http://localhost:3000/users";
const URL = "https://planx-beta-signup.herokuapp.com/users";

$.fn.serializeObject = function() {
  "use strict";
  var a = {},
    b = function(b, c) {
      var d = a[c.name];
      "undefined" != typeof d && d !== null
        ? $.isArray(d)
          ? d.push(c.value)
          : (a[c.name] = [d, c.value])
        : (a[c.name] = c.value);
    };
  return $.each(this.serializeArray(), b), a;
};

function submitted() {
  $("#content").fadeOut(() => {
    $("#thank-you").fadeIn();
  });
}

$.when($.ready).then(function() {
  var $body = $("body"),
    $select = $("#select_label");

  $("#select_label").on("click", function(e) {
    e.stopPropagation();
    if ($select.is(":checked")) {
      $body.on("click", function(e) {
        if (!$(e.target).is("#select_label + label")) {
          $select.prop("checked", false);
          $body.off("click");
        }
      });
    }
  });

  $("#options label").click(function() {
    $select.prop("checked", false);
  });

  $("#form").on("submit", e => {
    e.preventDefault();

    if (!$("input[name='occupation']:checked").val())
      return alert("please choose an occupation");

    $("#form").prop("disabled", true);
    $("#submit").prop("disabled", true);

    $.ajax({
      url: URL,
      method: "POST",
      dataType: "json",
      data: { user: $("#form").serializeObject() }
    })
      .done(submitted)
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Probably a CORS error...");
        submitted();
      })
      .always(function() {
        console.log("done");
      });
  });
});
