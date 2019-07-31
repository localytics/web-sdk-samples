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

class App extends React.Component {

  state = {
    readyForPush: false,
    permissionState: Notification.permission
  };

  componentDidMount() {
    window.addEventListener('load', () => {
      window.ll('registerPush',
        () => {
          console.log('Successfully registered for push!');
          this.setState({
            readyForPush: true,
            permissionState: Notification.permission
          });
        },
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
      </div>
    );
  }
}

export default App;
