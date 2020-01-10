import Identicon from 'identicon.js';

export function generateAvatar(hash,size) {
  const avatar = new Identicon(hash,size).toString();
  return `data:image/png;base64,${avatar}`;
}
