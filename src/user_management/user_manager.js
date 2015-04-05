Firebase.enableLogging(true);
var ref = new Firebase('https://vivid-heat-3174.firebaseio.com');

function createUser(emailPasswordObject)
{
  document.getElementById("error").innerHTML = "";
  ref.createUser(emailPasswordObject, function(error, userData) {
    if (error) {
      switch (error.code) {
        case "EMAIL_TAKEN":
          authWithPassword(emailPasswordObject);
          break;
        case "INVALID_EMAIL":
          document.getElementById("error").innerHTML = "You must enter a valid email.";
          break;
        default:
          document.getElementById("error").innerHTML = "We apologize, something unexpected has occured.";
          console.log("Error creating user:", error);
      }
    } else {  
      console.log("Successfully created user account with uid:", userData.uid);
      authWithPassword(emailPasswordObject);
    } 
  });
}

function authWithPassword(emailPasswordObject)
{
  document.getElementById("error").innerHTML = "";
  ref.authWithPassword(emailPasswordObject, function(error, authData) {
    if (error) {
     document.getElementById("error").innerHTML = "Invalid Password.";
   } else {
    console.log("Authenticated successfully with payload:", authData);
    var html = '<p> you have logged in successfully </p>';
    document.getElementById("form").innerHTML= html;
    key = authData.uid;
    assignPlayerNumber(key);
  }
});
}
