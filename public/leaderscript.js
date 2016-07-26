$(document).ready(function(){
       /* var xhttp;
        xhttp = new XMLHttpRequest();
       /* xhttp.onreadystatechange=function(){
            if(xhttp.readyState==4 && xhttp.status==200){

            }
        }
        xhttp.open("GET","leaderboard/"+Math.random(),true);
        console.log("sending");
        xhttp.send(); */
        var name,score;
        $.get("leaderboard/",function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                name=data[i].name;
                score=data[i].score;
                $("#div1").append("<tr><td>"+(i+1)+"</td><td>"+name+"</td><td>"+score+"</td><tr>");
            }
           // var strdata=JSON.stringify(data[0].attr("name"));
        //    $("#div1").html(strdata);
        });

      //  $.get("leaderboard/");
});
