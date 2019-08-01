import React from 'react';
import './App.css';
import { getAdjective, readCookie } from './util';

const red = '#f44336';
const green = '#4caf50';
const blue = '#2196f3';

const signedInKey = 'unique-customer-is-signed-in';
const userId = 'unique-customer-id';

class App extends React.Component {
  state = { loggedIn: false, taggedEvents: [] };

  componentDidMount() {
    /* check if user is logged in */
    const loggedIn = readCookie(signedInKey) === 'true';
    this.setState({
      loggedIn
    })
  }

  toggleState = () => {
    /* a toggle to detemine if user is logged in or not. */ 
    /* this is the action a user makes to become valuable to you */ 
    this.setState(state => ({
      loggedIn: !state.loggedIn
    }), () => {
      if (this.state.loggedIn) {
        this.logIn(userId);
      } else {
        this.logOut();
      }
    })
  };

  logOut = () => {
    console.log('%clogged out', `color: ${red}`);
    document.cookie = `${signedInKey}=false`;

    /* A user is no longer having sessions or events tracked */
    window.ll('tagEvent', 'Signed Out');
    window.ll('setCustomerId', null);
    window.ll('setDisableAnalyticsTracking', true);

    console.log(`tagged event: %cSigned Out`, `color: ${red}`);
  };

  logIn = (cid) => {
    console.log(`logged in as %c${cid}`, `color: ${green}; text-decoration: underline;`);
    document.cookie = `${signedInKey}=true`;

    /* begin tracking a known user */
    window.ll('setDisableAnalyticsTracking', false);
    window.ll('setCustomerId', cid);
    window.ll('tagEvent', 'Signed In');

    console.log(`tagged event: %cSigned In`, `color: ${blue}`);
  };

  tagEvent = () => {
    /* Make your event name here. Customize if you wish */
    const name = `${getAdjective()} Event`;
    /* Always tag events, if a user shouldn't be tracked, these will be a noop */
    window.ll('tagEvent', name)

    if (this.state.loggedIn) {
      this.setState(state => ({
        taggedEvents: [{ name, id: Math.random() }].concat(state.taggedEvents)
      }));
      console.log(`tagged event: %c${name}`, `color: ${blue}`);
    }
  }

  render() {

    const color = this.state.loggedIn ? green : red;
    const text = this.state.loggedIn ? 'YES' : 'NO';
    const buttonColor = !this.state.loggedIn ? green : red;
    const buttonText = this.state.loggedIn ? 'Stop Tracking' : 'Start Tracking';

    return (
      <div className="App">
        <code>While not signed in, no events are uploaded. "sign in" to see events being tagged/</code>
        <h1>Tracking User State: <span style={{ color }}>{text}</span></h1>
        <div>
          <div>
            <button
              type="button"
              style={{ backgroundColor: buttonColor, color: 'white' }}
              onClick={this.toggleState}
            >
              <h2>{buttonText}</h2>
            </button>
            <button
              type="button"
              style={{ backgroundColor: blue, color: 'white' }}
              onClick={this.tagEvent}
            >
              <h2>Tag An Event</h2>
            </button>
          </div>
          <div>
            {this.state.taggedEvents.map((event, index) => <h3 className="EventListItem" key={event.id}>{event.name}</h3>)}
          </div>
        </div>
      </div>
    );

  }
}

export default App;
