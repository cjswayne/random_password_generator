// FUNCTIONS



/* 
Function to generate random password
  Inputs needed: 
    - Length of password(integer 8-128char) -- range or input box?
    - Checkboxes
      - Lowercase Char (tf) 
      - Uppercase Char (tf)
      - Numeric Char (tf)
      - Special Char (tf)
*/

function randomPasswordGenerator(length, includeLower, includeUpper, includeNumbers, includeSpecial){
  
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#\\$%^&*()_+~`|}{[]:;?><,./-="; // needs to be reviewed for characters js identifies 

  //Validate length

  if (length < 8 || length > 128){
    throw new Error("Password must be between 8 and 128 characters.")
  }

  //Build a string of possible characters for the pass
  let possibleChars = '';
  possibleChars += includeLower ? lowerChars: '';
  possibleChars += includeUpper ? upperChars: '';
  possibleChars += includeNumbers ? numberChars: '';
  possibleChars += includeSpecial ? specialChars: '';


  // Make sure there is at least one character from selected criteria
  let randomPassword = '';
  randomPassword += includeLower ? lowerChars[Math.floor(Math.random() * lowerChars.length)]: '';
  randomPassword += includeUpper ? upperChars[Math.floor(Math.random() * upperChars.length)]: '';
  randomPassword += includeNumbers ? numberChars[Math.floor(Math.random() * numberChars.length)]: '';
  randomPassword += includeSpecial ? specialChars[Math.floor(Math.random() * specialChars.length)]: '';


  // Build password with random characters
  for (let i = randomPassword.length; i < length; i++){
    randomPassword += possibleChars[Math.floor(Math.random() * possibleChars.length)];
  }

  //Shuffle once more to ensure randomness
  randomPassword = randomPassword.split('').sort(() => 0.5 - Math.random()).join(''); 
  return randomPassword;
}

// Function to display generated password
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}



// Get references to the #generate element
document.addEventListener('DOMContentLoaded', function(){
  var myForm = document.forms['password-generator'];
  console.log(myForm);
  var generateBtn = document.querySelector("#generate");
  var length = myForm.elements['password-length'];
  var includeLowercase = myForm.elements['include-lowercase'];
  var includeUppercase = myForm.elements['include-uppercase'];
  var includeNumbers = myForm.elements['include-numbers'];
  var includeSpecial = myForm.elements['include-special'];

  generateBtn.addEventListener("click", function() {
    console.log(`Your Password is: ${randomPasswordGenerator(length.value, includeLowercase.checked, includeUppercase.checked, includeNumbers.checked, includeSpecial.checked)}`)
  });
});


// Add event listener to generate button

//console.log(randomPasswordGenerator(37, true, true, true, false));
