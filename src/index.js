// const URL =
//   "https://script.google.com/macros/s/AKfycbwT_FNQfkN9vJfZnIMkN273_ethCsO5TRPwnI-f8CFnACMFdv8/exec";
// const URL = "http://localhost:3000/users";
const URL = "https://planx-beta-signup.herokuapp.com/users";

function submitted() {
  $("#content").fadeOut(() => {
    $("#thank-you").fadeIn();
  });
}

$.when($.ready).then(function() {
  var is_mobile = false;

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    is_mobile = true;
  }

  var $body = $("body"),
    $select = $("#select_label");

  if (is_mobile) {
    $body.addClass("is-mobile");
  }

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

  $("form#form").on("submit", function(e) {
    e.preventDefault();

    if (!$("input[name='occupation']:checked").val() && !$("#select").val())
      return alert("please choose an occupation");

    var o = {};
    var a = $(this).serializeArray();

    a.forEach(item => {
      if (o[item.name]) {
        if (!o[item.name].push) {
          o[item.name] = [o[item.name]];
        }
        o[item.name].push(item.value || "");
      } else {
        o[item.name] = item.value || "";
      }
    });

    const data = { user: o };
    console.log(JSON.stringify(data, null, 2));

    $.ajax({
      url: URL,
      method: "POST",
      dataType: "json",
      data
    })
      .done(submitted)
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Probably a CORS error...");
        submitted();
      })
      .always(function() {
        console.log("done");
      });

    //must be last otherwise ie11 will not get form values
    $(this).prop("disabled", true);
    $("#submit").prop("disabled", true);
  });
});
