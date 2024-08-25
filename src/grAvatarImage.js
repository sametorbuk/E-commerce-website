
import md5 from 'md5'; 


const GravatarImage = ({ email, size = 100, alt = 'User avatar' }) => {
  const hash = md5(email.trim().toLowerCase());
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}`;

  return (
    <img
      src={gravatarUrl}
      alt={alt}
      style={{ borderRadius: '50%' }}
      width={size}
      height={size}
    />
  );
};



export default GravatarImage;