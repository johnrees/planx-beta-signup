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
      $.post(
         "https://webhook.site/481cb5bf-f10a-4355-850c-431ff26d147f",
         $("#form").serialize()
      )
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
