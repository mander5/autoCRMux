import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <a
        href='https://www.linkedin.com/in/alinamander/'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='LinkedIn'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          viewBox='0 0 24 24'
          width='32'
          height='32'
          fill='#0A66C2'
        >
          <title>LinkedIn</title>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.327-.025-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.413v1.561h.049c.476-.897 1.637-1.844 3.37-1.844 3.599 0 4.263 2.368 4.263 5.451v6.284zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM6.898 20.452H3.776V9H6.898v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      </a>
      <a href='mailto:alinamander.am@gmail.com' aria-label='Email'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          viewBox='0 0 24 24'
          width='32'
          height='32'
          fill='#555'
        >
          <title>Email</title>
          <path d='M1.5 4.5h21v15h-21v-15zm10.5 7.5L3 6.75v10.5h18V6.75L12 12z' />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
