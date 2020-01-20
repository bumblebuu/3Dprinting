// NEWSLETTER MODAL

$("#thankYouForm").submit(function(e){
  e.preventDefault();
  $.ajax({
      type : 'POST',
      data: $("#thankYouForm").serialize(),
      url : 'http://localhost:3000/',
      success : function(data){
          $("#answer").html(data);
          $("#thanksModal").modal("show");
      }
  });
  return false;
});