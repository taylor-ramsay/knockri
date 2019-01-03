import React, { Component } from 'react';
import './App.css';
import CandidateList from './components/CandidateList'
import CandidateResponses from './components/CandidateResponses'
import { Col, Row } from 'react-materialize'

class App extends Component {

  constructor() {
    super()
    this.state = {
      selectedCandidateApplicationId: null,
      selectedCandidateName: null,
    }
  }

  handleSelectedCandidateOnClick = (e, applicationId, name) => {
    this.setState({
      selectedCandidateApplicationId: applicationId,
      selectedCandidateName: name
    })
  }

  render() {
    return (
      <div className="App">
        <Row>
          <Col m={1}></Col>
          <Col m={5} className='grid-example'><CandidateList handleSelectedCandidateOnClick={this.handleSelectedCandidateOnClick} /></Col>
          <Col m={5} className='grid-example'><CandidateResponses selectedCandidateName={this.state.selectedCandidateName} selectedCandidateApplicationId={this.state.selectedCandidateApplicationId} /></Col>
          <Col m={1}></Col>
        </Row>
      </div>
    );
  }
}

export default App;
