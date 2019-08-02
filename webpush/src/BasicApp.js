import React from 'react';
import './App.css';

const red = '#f44336';
const green = '#4caf50';
const blue = '#2196f3';

const permissionColorMap = {
  granted: green,
  default: blue,
  denied: red
}
/* The simplest use case, using ll('registerPush') */
/* An all in one ask for push permission, utilizing no soft ask strategy */
class BasicApp extends React.Component {

  state = {
    readyForPush: false,
    permissionState: Notification.permission
  };

  componentDidMount() {
    window.addEventListener('load', () => {
      /* registerPush both registers a service worker and asks for push permission */
      /* it takes 2 callbacks so your app can react to a success or failure */
      window.ll('registerPush',
        /* on a successful registration and push ask */
        () => {
          console.log('Successfully registered for push!');
          this.setState({
            readyForPush: true,
            permissionState: Notification.permission
          });
        },
        /* on a failed registration or push ask */
        (e) => {
          console.error('Failed to register for push', e);
          this.setState({
            readyForPush: false,
            permissionState: Notification.permission
          });
        }
      );
    });
  }

  render() {
    const { permissionState, readyForPush } = this.state;
    const permissionColor = permissionColorMap[permissionState];
    return (
      <div className="App">
        <h1>This Page Will Always Try To Ask For Push Permission</h1>
        <h2>Permission State: <span style={{ color: permissionColor }}>{permissionState}</span></h2>
        {readyForPush && <h3 style={{ color: green }}>Have Permission To Push!</h3>}
        <code>replace <b style={{ background: 'wheat' }}>import App from './BasicApp';</b> with <b style={{ background: 'tomato' }}>import App from './AdvancedApp';</b> in <b style={{ background: 'grey', color: 'white' }}>src/index.js</b> for the soft ask use case</code>
      </div>
    );
  }
}

export default BasicApp;
