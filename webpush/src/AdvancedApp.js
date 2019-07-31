import React, { Fragment } from 'react';

class AdvancedApp extends React.Component {

  constructor(props) {
    super(props);
    window.addEventListener('load', this.registerSW);
  }

  state = {
    serviceWorkerEnabled: 'serviceWorker' in navigator,
    serviceWorkerRegistered: false,
    swRegistration: null,
    subscribedToPush: false,
    pushDenied: !('Notification' in window) || Notification.permission === 'denied',
  };

  registerSW = () => {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      window.ll('registerServiceWorker', (swReg) => {
        if (swReg) {
          this.setState({
            serviceWorkerEnabled: true,
            serviceWorkerRegistered: true,
            swRegistration: swReg || null
          }, () => {
            const { swRegistration } = this.state;
            if (Notification.permission === 'granted' && swRegistration) {
              this.askForPush();
            }
          });
        }
        return swReg;
      }, console.error);
    }
  };

  askForPush = () => {
    const { serviceWorkerEnabled, serviceWorkerRegistered } = this.state;
    if (serviceWorkerEnabled && serviceWorkerRegistered) {
      window.ll('subscribeToWebPush', (pushSubscription) => {
        if (pushSubscription) {
          this.setState(
            { subscribedToPush: true }
          );
        }
      }, (e) => {
        this.setState({ pushDenied: true });
        console.error(e);
      });
    }
  }

  renderListItem = name => (<li key={name}>
    {this.state[name] ? <span role="img" aria-label="success">✅</span> : <span role="img" aria-label="fail"> ❌</span>}
    <span>{name}</span>
  </li>);

  render() {
    const keys = ['serviceWorkerEnabled', 'serviceWorkerRegistered', 'subscribedToPush'];
    return (
      <Fragment>
        <ul>
          {keys.map(this.renderListItem)}
        </ul>
        {
          this.state.subscribedToPush ?
            <h2>Thanks for subscribing! you can now receive notifications from us! <span role="img" aria-label="success">🎉</span></h2>
            :
            <Fragment>
              <h2>Want to receive fun notifications from us? </h2>
              {(() => {
                if (!('Notification' in window) || this.state.pushDenied || Notification.permission === 'denied') {
                  return <span>To enable push, you need to click on the icon next to the address bar <span role="img" aria-label="success">🙏</span></span>;
                }
                return <button onClick={this.askForPush}>Enable Push!</button>;
              })()}
            </Fragment>

        }
      </Fragment>
    );
  }
}

export default AdvancedApp;
