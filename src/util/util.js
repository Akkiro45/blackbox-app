export const isEmty = (string) => {
  let count = 0;
  for(let i=0; i<string.length; i++) {
    if(string.charAt(i) === ' ') count += 1;
  }
  if(count === string.length) return true;
  else return false;
}

export const validatePassword = (password) => {
  if(isEmty(password)) {
    return 'Please enter password!';
  } else if(password.length > 16 || password.length < 2) {
    return 'Please enter password between 2 to 16 character!'
  } else {
    return false;
  }
}