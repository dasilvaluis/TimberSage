/*
|--------------------------------------------------------------------------
| Validate Email Address
|--------------------------------------------------------------------------
| Helper function to check whether email is valid or not
| Input: String
*/
function isEmail( email ) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
