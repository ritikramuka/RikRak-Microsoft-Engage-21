import workRemotely from '../../images/work_remotely.svg';
import groupHangout from '../../images/group_hangout.svg';
import secureLogin from '../../images/secure_login.svg';

export const homeObjeOne = {
  id: 'about', 
  lightBg: false, 
  lightText: true, 
  topLine: 'Premium Video Calls', 
  headline: 'See the whole picture', 
  description: 'RikRakCall is built radically different. We left behind slow bulky servers, opting for decentralized peer to peer calling. We engineered a platform with maximum video quality and lowest latency.', 
  buttonLabel: 'Get started', 
  imgStart: false, 
  img: workRemotely, 
  alt: 'Work Remotely', 
  dark: true, 
  primary: true, 
  darkText: false, 
};

export const homeObjeTwo = {
  id: 'discover', 
  lightBg: true, 
  lightText: false, 
  topLine: 'Unlimited access', 
  headline: 'Video Call with your family, friendly, colleagues any time', 
  description: 'We have you covered no matter where you are located. All you need is an internet connnection and a computer.', 
  buttonLabel: 'Learn more', 
  imgStart: true, 
  img: groupHangout, 
  alt: 'Group Hangout', 
  dark: false, 
  primary: false, 
  darkText: true, 
};

export const homeObjeThree = {
  id: 'signup', 
  lightBg: true, 
  lightText: false, 
  topLine: 'Make a Video Call now', 
  headline: 'Creating an accout is extremely easy', 
  description: 'Get everything set up and ready in under 5 minutes. All you need to do is add your information and you\'re ready to go. ',
  buttonLabel: 'Start now', 
  imgStart: false, 
  img: secureLogin, 
  alt: 'Secure Login', 
  dark: false, 
  primary: false, 
  darkText: true, 
};