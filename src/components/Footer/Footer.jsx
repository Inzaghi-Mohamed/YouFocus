import React from 'react';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'
const currentYear = new Date().getFullYear();
function Footer() {
  return <footer className=' text-center my-2 font-extralight'>YouFocus&copy;{currentYear}. All rights Reserved</footer>;
}

export default Footer;
