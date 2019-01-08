import React from 'react';
import * as images from '../images/index';

const imageProps = [
  {
    className: 'google-plus',
    alt: 'google-plus',
    src: images.google,
  },
  {
    className: 'login-socials',
    alt: 'facebook-login',
    src: images.facebook,
  },
  {
    className: 'login-socials',
    alt: 'twitter-login',
    src: images.twitter,
  },
];

export default function SocialAuths() {
  return (
    <div className="social-auths">
      {imageProps.map(item => (
        <img key={Math.random() / 13} className={item.className} alt={item.alt} src={item.src} />
      ))}
    </div>
  );
}
