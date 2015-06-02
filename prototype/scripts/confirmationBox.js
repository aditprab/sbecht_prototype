$(document).ready(function(){

   var vartext = "Organization Name: Web Usability Industries" + "<br>" + "Category: Labor Trafficking" + "<br>" + "Type of Service: Legal" + "<br>" + "Age: Child" + "<br>" + "Address: 123 Rani Way" + "<br>" + "Number: 123-456-7890";
  
   $("#complexConfirm").confirm({
    title:"Please confirm this submission: ",
    text: vartext,
    confirm: function(button) {
        button.fadeOut(2000).fadeIn(2000);
 		var url = "confirmation.html";    
		$(location).attr('href',url);

    },

    cancel: function(button) {
        console.log(jsonify());
    },
    confirmButton: "Submit it!",
    cancelButton: "No, I will change.",
    confirmButtonClass: "btn-success",
    cancelButtonClass: "btn-danger"

});



})
