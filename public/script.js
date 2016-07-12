$(document).ready(function(){
    
    fiftyf=1,ff2=1, audiencep=1,ap2=1, flipq=1,fq2=1, doubled=1,dd2=1, powerp=0,pp2=0; var quit=1;
    var currentq=1, currentp=0;
    var questionarray, username;
    var isans=0,chosenans=0;
    var isclicked=1;
    var questionnumber;
    
    $.get("data.json", function(data){
        
        questionarray = data;
        init();
        
    });
  
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
        username = prompt("Enter your name:\n", "user");
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
            $("#ff").css("visibility", "visible");
        }
        else
        {
            $("#ff").css("visibility", "hidden");
        }
        if(audiencep==1){
            $("#ap").css("visibility", "visible");
        }
        else
        {
            $("#ap").css("visibility", "hidden");
        }
        if(doubled==1){
            $("#dd").css("visibility", "visible");
        }
        else
        {
            $("#dd").css("visibility", "hidden");
        }
        if(flipq==1){
            $("#fl").css("visibility", "visible");
        }
        else
        {
            $("#fl").css("visibility", "hidden");
        }
        if(powerp==1){
            $("#pp").css("visibility", "visible");
        }
        else
        {
            $("#pp").css("visibility", "hidden");
        }
        $("#quit").css("visibility", "visible");
        if(currentq==0){
            for(var i=1;i<=4;i++){
                    $("#o" + i).css("visibility", "hidden");
            }
        }
        else if(isans==0){
            for(var i=1;i<=4;i++){
                    $("#o" + i).css("color", "#000000").css("visibility", "visible");
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
                    $("#o" + i).css("color", "#000000").css("visibility", "visible");
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
       var ffarray = questionarray[questionnumber-1]["ff"];
       for(var i=0;i<2;i++){
           $("#o" + ffarray[i]).css("visibility","hidden");
       }
       fiftyf=0;
       ff2=0;
    });
    $("#ap").click(function(){
       var aparray = questionarray[questionnumber-1]["ap"];
       $("#apr").css("visibility","visible");
       for(var i=1;i<=4;i++){
           $("#ao" + i).html(i+": "+aparray[i-1]+"%");
       }
       audiencep=0;
       ap2=0;
    });
    $("#fl").click(function(){
        flipq=0;
        fl2=0;
        displaymessage("enterguess");
    });
    $("#quit").click(function(){
        quit=0;
        displaymessage("enterguess");
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
            $("#ansmess").css("color","red").css("visibility","visible");
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
            $("#ansmess").html("You won &#8377;"+moneywon+"!\nThank you for playing!");
            $("#ansmess").css("color","yellow").css("visibility","visible");
            $.post("leaderboard/",{ "name":username,"score":moneywon,"sorts":sendmoneytoserver });
        }
        else if(data=="win"){
            currentq=0;
            display();
            $("#ll, #ll > span").css("visibility","hidden");
            $("#monlist, #monlist > div").css("visibility","hidden"); 
            $("#ansmess").html("Congratulations! You have won &#8377; 7 crores! You win the game!");
            $("#ansmess").css("color","green").css("visibility","visible");
            $.post("leaderboard/",{ "name":username,"score":moneywon,"sorts":"70000000" });
        }
        else if(data=="flipc"){
            $("#ansmess").html("That would have been the correct answer!").css("color","green").css("visibility","visible");
        }
        else if(data=="flipw"){
            $("#ansmess").html("That would have been the incorrect answer!").css("color","red").css("visibility","visible");
        }
        else if(data=="enterguess"){
            $("#ansmess").html("Please guess an answer").css("color","yellow").css("visibility","visible");
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
                    display();
                    $("#ll, #ll > span").css("visibility","hidden");
                    
                    $("#monlist, #monlist > div").css("visibility","hidden");
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
                    display();
                    $("#ll, #ll > span").css("visibility","hidden");
                    
                    $("#monlist, #monlist > div").css("visibility","hidden");
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
                    display();
                    $("#ll, #ll > span").css("visibility","hidden");
                    
                    $("#monlist, #monlist > div").css("visibility","hidden");
                    currentq=temp;
                    displaymessage("result");
                },2000);                      
 
            }
        }
    });
});