$(document).ready(function(){
    //console.log(sessionStorage.value);
    if(typeof(sessionStorage.value)!='undefined'){
      var obj = jQuery.parseJSON(sessionStorage.value);
      $("#message").append("You won &#8377;"+obj.score+"!\nThank you for playing!");
    }
    else{
      location.href="index.html";
    }
    $("#submitbutton").click(function(){
      if(document.getElementById("namefield").value !=""){
        $.post("leaderboard/",obj);
        sessionStorage.clear();
        location.href="index.html";
      }
    });
    $("#dontsubmitbutton").click(function(){
      sessionStorage.clear();
      location.href="index.html";
    });
});
