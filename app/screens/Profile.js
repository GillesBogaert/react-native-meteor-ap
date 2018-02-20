import PropTypes from 'prop-types';
import { Text } from 'react-native';
import React, { Component} from 'react';
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';
import { NavigationActions } from 'react-navigation';
import Container from '../components/Container';
import { Header } from '../components/Text';
import { Input, PrimaryButton } from '../components/Form';
import { Card } from 'react-native-elements';
class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }
  
  state = {
    name: '',
    error: null,
    success: null,
    creating: false,
  }

  signOut = () => {
    Meteor.logout(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'SignUp' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    });
  };

  componentDidMount() {
    const { ridesReady } = this.props;
    console.log(ridesReady);
  }
  
  renderRow(ride) {
    return (<Text>Name: { ride.name }</Text>);
  }
  
  createRide = () => {
    if (this.state.creating) {
      return;
    }
    
    const rideEntry = { name: this.state.name };
    
    this.setState({creating: true});
    Meteor.call('rides.create', rideEntry, (err, result) => {
      this.setState({creating: false});
      if (err) {
        return this.setState({error: err.message});
      }
      
      this.setState({success: true, name: ''});
    });
  }

  render() {
    return (
      <Container>
        <Header>
          Profile
        </Header>
        
        {this.state.error && <Text style={{ backgroundColor: 'red' }}>{ this.state.error }</Text>}
        
        <Card>
          <Input
            label="Name"
            placeholder="Name of the ride"
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
          />
          <PrimaryButton
            title={ this.state.creating ? "Creating...." : "Create Ride" }
            onPress={this.createRide}
          />
        </Card>
        <PrimaryButton
          title="Sign Out"
          onPress={this.signOut}
        />
         <MeteorListView
          collection="rides"
          renderRow={this.renderRow}
          />
      </Container>
      
    );
  }
}

export default createContainer(params => {
  const handle = Meteor.subscribe('Rides');
  console.log(Meteor.collection('rides').find());
  return {
    ridesReady: handle.ready(),
    rides: handle.ready() ? Meteor.collection('rides').find() : [],
  };
}, Profile)
