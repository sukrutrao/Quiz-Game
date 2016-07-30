$(document).ready(function(){

    fiftyf=1,ff2=1, audiencep=1,ap2=1, flipq=1,fq2=1, doubled=1,dd2=1, powerp=0,pp2=0; var quit=1;
    var currentq=1, currentp=0;
    var questionarray, username;
    var isans=0,chosenans=0;
    var isclicked=1;
    var questionnumber;
    var hide = [];
    var ffstatus = 0;

    $.get("../data/data.json", function(data){

        questionarray = data;
        init();

    });

    function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "-" + month + "-" + year + "   " + hour + ":" + min + ":" + sec;

}

    function init(){

        fiftyf=1;
        audiencep=1;
        flipq=1;
        doubled=0;
        powerp=0;
        quit=1;
        currentq=1;
        currentp=0;
        isans=0;
        $("body").css("visibility", "hidden");
      //  username = prompt("Enter your name:\n", "user");
        display();
        play();
    }
    function display(){

        $("body").css("visibility", "visible");
        if(currentq!=0){
            $("#qtitle").css("visibility", "visible");
            $("#q").css("visibility", "visible");

        }
        else{
            $("#q").css("visibility","hidden");
            $("#qtitle").css("visibility", "hidden");
        }
        for(var i=1;i<16;i++){
            if($("#p" + i).attr("data-iscp")=="true" && currentq!=i){
                $("#p" + i).css("color","red").css("visibility", "visible");
            }
            else if(currentq == i){
                $("#p" + i).css("color", "green").css("visibility", "visible");
            }
            else {

                $("#p" + i).css("color", "yellow").css("visibility", "visible");
            }
        }
        if(fiftyf==1){
            $("#ff").prop('disabled', false);
        }
        else
        {
            $("#ff").prop('disabled', true);
        }
        if(audiencep==1){
            $("#ap").prop('disabled', false);
        }
        else
        {
            $("#ap").prop('disabled', true);
        }
    /*    if(doubled==1){
            $("#dd").css("visibility", "visible");
        }
        else
        {
            $("#dd").css("visibility", "hidden");
        }*/
        if(flipq==1){
            $("#fl").prop('disabled', false);
        }
        else
        {
            $("#fl").prop('disabled', true);
        }
  /*      if(powerp==1){
            $("#pp").css("visibility", "visible");
        }
        else
        {
            $("#pp").css("visibility", "hidden");
        }*/
        $("#quit").prop('disabled', false);
        if(ff2==0 && ffstatus==1){
          $("#o" + hide[0]).css("visibility", "hidden");
          $("#o" + hide[1]).css("visibility", "hidden");
          ffstatus=0;
        }
        if(currentq==0){
            for(var i=1;i<=4;i++){
                    $("#o" + i).css("visibility", "hidden");
            }
        }
        else if(isans==0){
            for(var i=1;i<=4;i++){
                    $("#o" + i).css("color", "#66ffff").css("visibility", "visible");
            }
        }
        else
        {
            for(var i=1;i<=4;i++){
                if(chosenans==i){
                    $("#o" + i).css("color", "yellow").css("visibility", "visible");
                }
                else
                {
                    $("#o" + i).css("color", "#66ffff").css("visibility", "visible");
                }

            }
        }
        $("#ansmess").css("visibility","hidden");
        $("#apr").css("visibility","hidden");
    }
    function play(){
        if(currentq<16){

            isclicked=0;
            if(ff2==0){
                questionnumber=(currentq-1)*10+Math.floor(Math.random()*5)+5;
            }
            else{
                questionnumber=(currentq-1)*10+Math.floor(Math.random()*5);
            }
            ff2=1;
            ap2=1;
            dd2=1;
            fl2=1;
            pp2=1;
            $("#q").html(questionarray[questionnumber-1].question);
            for(var i=1;i<=4;i++){
                $("#o" + i).html(questionarray[questionnumber-1]["o" + i]);
            }
            $("#qtitle").html("Question No.: "+currentq);
        }
        else{
            displaymessage("win");
        }
    }
    $("#ff").click(function(){

       var count = 0;
       var correctans = questionarray[questionnumber-1]["ca"];
       var otherOption;
       do{
         otherOption = 1+Math.floor(Math.random()*4);
       }while(otherOption==correctans);
       for(var i=0;i<4;i++){
            if(i!=(correctans-1) && i!=(otherOption-1)){
              $("#o" + (i+1)).css("visibility","hidden");
              hide[count++] = i+1;
            }

       }
       fiftyf=0;
       ff2=0;
       ffstatus=1;
       $("#ff").prop('disabled', true);
       $("#ap").prop('disabled', true);
       $("#fl").prop('disabled', true);
    });
    $("#ap").click(function(){
       var correctans = questionarray[questionnumber-1]["ca"];
       console.log(correctans);
       var aparray = [];
       var seed=Math.floor(Math.random()*10);
       if(currentq<=4){
         if(seed>=8){
           aparray[correctans-1]=30+Math.floor(Math.random()*30);
         }
         else {
           aparray[correctans-1]=50+Math.floor(Math.random()*50);
         }

       }
       else if(currentq<=8){
         if(seed>=6){
           aparray[correctans-1]=20+Math.floor(Math.random()*36);
         }
         else{
           aparray[correctans-1]=40+Math.floor(Math.random()*40);
         }
       }
       else{
         if(seed>=5){
           aparray[correctans-1]=Math.floor(Math.random()*50);
         }
         else{
           aparray[correctans-1]=20+Math.floor(Math.random()*40);
         }
       }
       var remainingPercentage = 100-aparray[correctans-1];
       var tempPercentage;
       for(var i=0;i<4;i++){
         if(i!=(correctans-1)){
           do{
             tempPercentage = Math.floor(Math.random()*100);
           }while(tempPercentage>remainingPercentage);
           remainingPercentage-=tempPercentage;
           aparray[i]=tempPercentage;


         }
       }
       $("#apr").css("visibility","visible");
       for(var i=1;i<=4;i++){
           $("#ao" + i).css("width",aparray[i-1]+"%");
           $("#ao" + i).html(aparray[i-1]+"%");
       }
       audiencep=0;
       ap2=0;
       $("#ap").prop('disabled', true);
    });
    $("#fl").click(function(){
        flipq=0;
        fl2=0;
        displaymessage("enterguess");
        $("#fl").prop('disabled', true);
        $("#ap").prop('disabled', true);
        $("#ff").prop('disabled', true);
        $("#ff").prop('disabled', true);
        $("#quit").prop('disabled', true);
    });
    $("#quit").click(function(){
        quit=0;
        fiftyf=0;
        audiencep=0;
        flipq=0;
        displaymessage("enterguess");
        $("#ff").prop('disabled', true);
        $("#fl").prop('disabled', true);
        $("#ap").prop('disabled', true);
        $("#quit").prop('disabled', true);

    });
    function displaymessage(data)
    {
        var moneywon,sendmoneytoserver;
        if(data=="correct"){
            $("#ansmess").html("That is the correct answer!\nYou have won &#8377;"+$("#p"+currentq).attr("data-value")+"!\n");
            $("#ansmess").css("color","green").addClass("alert alert-success").css("visibility","visible");
        }
        else if(data=="incorrect"){
            $("#ansmess").html("That is the incorrect answer!\n");
            $("#ansmess").css("color","red").addClass("alert alert-danger").css("visibility","visible");
        }
        else if(data=="result"){
            if(quit==0 && currentq>1){
                var temp=currentq-1;
                moneywon=$("#p"+temp).attr("data-value");
                sendmoneytoserver=$("#p"+currentq).attr("data-value");
            }
            else if(quit==0){
                moneywon="0";
                sendmoneytoserver="0";
            }
            else if(currentq<=4){
                moneywon="0";
                sendmoneytoserver="0";
            }
            else if(currentq<=8){
                moneywon=$("#p4").attr("data-value");
                sendmoneytoserver=$("#p4").attr("data-num");
            }
            else
            {
                moneywon=$("#p8").attr("data-value");
                sendmoneytoserver=$("#p4").attr("data-num");
            }
        /*    $("#ansmess").html("You won &#8377;"+moneywon+"!\nThank you for playing!");
            $("#ansmess").css("color","yellow").addClass("alert alert-success").css("visibility","visible");*/
            var resultObj={ "name":username,"score":moneywon,"sorts":sendmoneytoserver, "timestamp":getDateTime() };
            sessionStorage.value=JSON.stringify(resultObj);
            location.href="result.html";
      //      $.post("leaderboard/",{ "name":username,"score":moneywon,"sorts":sendmoneytoserver, "timestamp":getDateTime() });
        }
        else if(data=="win"){
            currentq=0;
            display();
          /*  $("#ll, #ll > span").css("visibility","hidden");
            $("#monlist, #monlist > div").css("visibility","hidden");*/
      /*      $("#ansmess").html("Congratulations! You have won &#8377; 7 crores! You win the game!");
            $("#ansmess").css("color","green").addClass("alert alert-success").css("visibility","visible");
            $.post("leaderboard/",{ "name":username,"score":moneywon,"sorts":"70000000", "timestamp":getDateTime() });*/
            var resultObj={ "name":username,"score":moneywon,"sorts":sendmoneytoserver, "timestamp":getDateTime() };
            sessionStorage.value=JSON.stringify(resultObj);
            location.href="result.html";
        }
        else if(data=="flipc"){
            $("#ansmess").html("That would have been the correct answer!").css("color","green").addClass("alert alert-success").css("visibility","visible");
        }
        else if(data=="flipw"){
            $("#ansmess").html("That would have been the incorrect answer!").css("color","red").addClass("alert alert-danger").css("visibility","visible");
        }
        else if(data=="enterguess"){
            $("#ansmess").html("Please guess an answer").css("color","blue").addClass("alert alert-info").css("visibility","visible");
        }
    }
    $("#o1,#o2,#o3,#o4").click(function(){
        if(dd2==1 && fl2==1 && quit==1 && isclicked==0){
            isclicked=1;
            isans=1;
            chosenans=Number($(this).attr("data-value"));
            display();
            var currop = $(this);
            if(questionarray[questionnumber-1]["ca"].toString()==$(this).attr("data-value"))
            {
                setTimeout(function(){
                      currop.css("color","green");
                      displaymessage("correct");
                },1000);
                setTimeout(function(){
                    currentq++;
                    isans=0;
                    display();
                    play();
                },2000);
            }
            else
            {
                var currans=$("#o"+questionarray[questionnumber-1]["ca"].toString());
                setTimeout(function(){
                    currop.css("color","red");
                    currans.css("color","green");
                    displaymessage("incorrect");
                },1000);
                setTimeout(function(){
                    var temp=currentq;
                    currentq=0;
                  //  display();
                  /*  $("#ll, #ll > span").css("visibility","hidden");

                    $("#monlist, #monlist > div").css("visibility","hidden");*/
                    currentq=temp;
                    displaymessage("result");

                },2000);
            }
        }
        else if(fl2==0 && questionarray[questionnumber-1]["ca"].toString()==$(this).attr("data-value") && isclicked==0){
            isclicked=1;
            isans=1;
            chosenans=Number($(this).attr("data-value"));
            display();
            var currop = $(this);
            setTimeout(function(){
              currop.css("color","green");
              displaymessage("flipc");
            },1000);
            setTimeout(function(){

                isans=0;
                display();
                play();
            },2000);

        }
        else if(fl2==0 && isclicked==0){
            isclicked=1;
            isans=1;
            chosenans=Number($(this).attr("data-value"));
            display();
            var currop = $(this);
            var currans=$("#o"+questionarray[questionnumber-1]["ca"].toString());
            setTimeout(function(){
               currop.css("color","red");
                currans.css("color","green");
               displaymessage("flipw");
            },1000);
            setTimeout(function(){

                isans=0;
                display();
                play();
            },2000);
        }
        else if(quit==0){
            isclicked=1;
            isans=1;
            chosenans=Number($(this).attr("data-value"));
            display();
            var currop = $(this);
            if(questionarray[questionnumber-1]["ca"].toString()==$(this).attr("data-value")){
                setTimeout(function(){
                    currop.css("color","green");
                    displaymessage("flipc");
                },1000);
                setTimeout(function(){
                    var temp=currentq;
                    currentq=0;
              //      display();
                /*    $("#ll, #ll > span").css("visibility","hidden");

                    $("#monlist, #monlist > div").css("visibility","hidden");*/
                    currentq=temp;
                    displaymessage("result");
                },2000);
            }
            else{
                 var currans=$("#o"+questionarray[questionnumber-1]["ca"].toString());
                setTimeout(function(){
                    currop.css("color","red");
                    currans.css("color","green");
                    displaymessage("flipw");
                },1000);
                setTimeout(function(){
                    var temp=currentq;
                    currentq=0;
              //      display();
                /*    $("#ll, #ll > span").css("visibility","hidden");

                    $("#monlist, #monlist > div").css("visibility","hidden");*/
                    currentq=temp;
                    displaymessage("result");
                },2000);

            }
        }
    });
});
