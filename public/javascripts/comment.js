/**
 * Created by Darshana on 4/18/2017.
 */
var inputs = document.getElementsByName('review');
var name = document.getElementById('name').innerHTML;
var userid = document.getElementById('userId').innerHTML;

for (var i = 0;i<inputs.length; i++) {
    var input = inputs[i];
    console.log('added eventListener');
    input.addEventListener('keypress',function(e){
        if (e.key == "Enter" && e.target.value != "") {
            console.log(e.target.value);
            createComment(e.target);

        }
    });
}

function getUser(fname,lname,id){
    var name = fname+" "+lname;
    var user_id = id;
    console.log(name);
    console.log(user_id);
}

// add a comment to the place details wen click the submit button
function createCommentbutton(button){ // take the clicked button as the input
    var input = button.parentNode;

    var parent =input.parentNode.parentNode; //  take the place details div element
    var commentDiv = parent.getElementsByClassName('comments')[0]; // get the part that we want to display the comment

    // create div element to add comment details
    var div = document.createElement('div');
    div.classList.add('col-1-of','col-10','comment');

    //  create label to record the name of the commenter(person)
    var username = document.createElement('label');
    username.classList.add('col-12','label-md');
    username.innerText = name;

    console.log(parent);
    // console.log(parent.parentNode.id);
// comment
    var comment = document.createElement('div');
    comment.classList.add('col-1-of','para-sm');
    comment.textContent = commentDiv.getElementsByTagName('input')[0].value;

    //combine created divs and labels and create comment
    div.appendChild(username);
    div.appendChild(comment);

    addReview(parent.parentNode.id,commentDiv.getElementsByTagName('input')[0].value,document.getElementById('userId').innerHTML);
    // add created comment to the place details div
    commentDiv.insertBefore(div, commentDiv.getElementsByTagName('input')[0]);

    commentDiv.getElementsByTagName('input')[0].value = ""; // after displaying the comment clear the input field

}

//add a comment when press Enter in the key board
function createComment(input){ // take the input field as the input to the function

    // rest is same as the above function
    var parent =input.parentNode.parentNode;
    var commentDiv = parent.getElementsByClassName('comments')[0];

    var div = document.createElement('div');
    div.classList.add('col-1-of','col-10','comment');

    var username = document.createElement('label');
    username.classList.add('col-12','label-md');
    username.innerText = name;


    var comment = document.createElement('div');
    comment.classList.add('col-1-of','para-sm');

    comment.textContent = input.value;

    div.appendChild(username);
    div.appendChild(comment);

    commentDiv.insertBefore(div, commentDiv.getElementsByTagName('input')[0]);

    input.value = "";
}

function addReview(id,text,user_id) {

    console.log(id);
    console.log(text);
    console.log(user_id);
    var params = "id="+id+"&text="+text+"&user_id="+user_id;
    var url = "/updatePlace";

    console.log(params);
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); // parse the return text to JSON obj
            // for each json object getin from the server add a marker
            console.log(data);
        }

    }

    //send ajax req to the server to get the use details
    xmlhttp.open("GET", url+"?"+params, true);
    xmlhttp.send();
}

// to get the details of the owner of the place
function showUserDetails(id){ // take the user id as the input

    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText); // parse the return text to JSON obj
            // for each json object getin from the server add a marker
                console.log(data);
            }

    }

    //send ajax req to the server to get the use details
    xmlhttp.open("GET", "/user/"+id, true);
    xmlhttp.send();
}

