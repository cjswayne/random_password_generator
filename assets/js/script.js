// Function to generate a randomness
function randomPasswordGenerator(length, includeLower, includeUpper, includeNumbers, includeSpecial) {

  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#\\$%^&*()_+~`|}{[]:;?><,./-=";

  //Validate length

  if (length < 8 || length > 128) {
    return alert("Password must be between 8 and 128 characters.")
  } else if (!includeLower && !includeUpper && !includeNumbers && !includeSpecial) {
    return alert('no characters selected')
  };

  // Create object containing characters needed

  const charSets = {
    lower: includeLower ? lowerChars : '',
    upper: includeUpper ? upperChars : '',
    numbers: includeNumbers ? numberChars : '',
    special: includeSpecial ? specialChars : '',
  };

  // Make sure the password has at least one character of user selected characters
  let possibleChars = '';
  let randomPassword = '';
  for (const [key, value] of Object.entries(charSets)) {
    possibleChars += value;
    if (value) {
      randomPassword += value[Math.floor(Math.random() * value.length)];
    };
  }

  // Build password with random characters
  const remainingLength = length - randomPassword.length;
  const randomChars = Array.from({ length: remainingLength }, () => possibleChars[Math.floor(Math.random() * possibleChars.length)]);
  randomPassword += randomChars.join('');

  // Shuffle Password To ensure randomness
  randomPassword = shuffleString(randomPassword);

  return randomPassword;
}

// Function to Ensure non-biased randomness
function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

// Function to shuffle string
function shuffleString(str) {
  const array = str.split('');
  fisherYatesShuffle(array);
  return array.join('');
}

// Function to display generated password
function writePassword(password) {
  if (password != undefined) {
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
  };
}

// Function to clear Password
function clearPassword() {
  var passwordText = document.querySelector("#password");
  passwordText.value = "";
}

// Get references to the #generate element
document.addEventListener('DOMContentLoaded', function () {
  var myForm = document.forms['password-generator'];
  var generateBtn = document.querySelector("#generate");
  var length = myForm.elements['password-length'];
  var includeLowercase = myForm.elements['include-lowercase'];
  var includeUppercase = myForm.elements['include-uppercase'];
  var includeNumbers = myForm.elements['include-numbers'];
  var includeSpecial = myForm.elements['include-special'];
  generateBtn.addEventListener("click", function () {
    clearPassword();
    writePassword(randomPasswordGenerator(length.value, includeLowercase.checked, includeUppercase.checked, includeNumbers.checked, includeSpecial.checked));
  });
});
