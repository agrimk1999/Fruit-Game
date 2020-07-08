/* algo for the the game
click on start reset button
    are we playing?
         yes
            reload page
         no
            show trials left
            change button text to reset game
                create a random fruit
                define a random step
                move fruit down down one step every 30sec
                  is fruit too low?
                    no-> repeat to go down
                    yes->any trials left?
                          yes:repeat-> create a random fruit
                            no:show game over button and button text->start game
                            
slice a fruit
   play sound
     explode fruit*/
var playing=false;
var score;
var trialsleft;
var fruits=['apple','cherry','grapes','kiwi','lemon','mango','orange','peach','pear','pineapple','watermelon'];
var step;
var action;
$(function(){
// click on start reset button
    $("#startreset").click(function(){
        if(playing==true)
            {
                //reload page
               location.reload();
               

            }
        else{
            playing=true;//game initiated
            
              $("#gameover").hide();
            
            //set score to zero
            score=0;
            $("#scoreValue").html(score);
            
            //show trials left box
            $("#trialsleft").show();
            trialsleft=3;
            addhearts();
            
            //change button text to reset s
            $("#startreset").html("Reset game");
            
            //start sending fruits
            startfruits();
        }
        
    });
    
    //slice a fruit play sound and fruit explode
$("#fruit1").mouseover(function(){
   score++;
    $("#scoreValue").html(score);
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play();//jquery selector returns an array and first element is the sound
    
  //stop fruit and hide it
    clearInterval(action);
    
    //hide fruit
    $("#fruit1").hide("explode",500);//slicing the fruit
    
    //send new fruit
   setTimeout(startfruits,500);
});


function addhearts()
{
    $("#trialsleft").empty();
    for(i=0;i<trialsleft;i++){
                $("#trialsleft").append('<img src="images/heart.png" class="life">');
            }
    
}
function startfruits()
{
//    this element requires appeding new fruit everytime while thw game runs that is requires more memory
//    $("#fruitcontainer").append('<img src="images/apple.png" class="fruits">');
    $("#fruit1").show();
    choosefruit();//generate random fruit
    $("#fruit1").css({//random position
        'left':Math.round(Math.random()*550),
        'top' : -50
        });
    
    //generate a random step
    step=1 + Math.floor(5*Math.random());
    //move fruit down every 10ms
    action=setInterval(function(){
        
        $("#fruit1").css('top' , $("#fruit1").position().top + step);//mpve fruit by one step
        //check if fruit is too low
        if($("#fruit1").position().top > $("#fruitcontainer").height())
            {
                //check if we have trials left
                if(trialsleft > 1)
                   {
                       
                    $("#fruit1").show();
                    choosefruit();//generate random fruit
                   $("#fruit1").css({//random position
        'left':Math.round(Math.random()*550),
        'top' : -50
        });
    
    //generate a random step
    step= 1 + Math.floor(5*Math.random());
                       
            //reduce trials 
                       trialsleft--;
                       
                       //populate trialsleft box
                       addhearts();

                   }
                else{//game over
                    playing=false;
                    
                    $("#startreset").html("Start game");
                    
                    $("#gameover").show();
                    
                    $("#gameover").html('<p>Game Over!</p><p>Your score is :' + score + '</p>');
                    $("#trialsleft").hide();
                    $("gameover").dialog("open");
                    stopAction();
                }
            }
        
        
    },10);
    
}
function choosefruit(){
    $("#fruit1").attr('src','images/' + fruits[Math.floor(11*Math.random())] + '.png');
}
function stopAction(){
    
    clearInterval(action);
    $("#fruit1").hide();
}
});