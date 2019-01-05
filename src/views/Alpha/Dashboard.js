import React, { Component } from 'react';
import {
  // Badge,
  // Button,
  // ButtonDropdown,
  // ButtonGroup,
  // ButtonToolbar,
  Card,
  CardBody,
  // CardFooter,
  // CardHeader,
  // CardTitle,
  Col,
  // Dropdown,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  // Progress,
  Row,
  //Table,
} from 'reactstrap';

import SoilECStats from '../Stats/Alpha/Soil/SoilEC';
import SoilEpsilonStats from '../Stats/Alpha/Soil/SoilEpsilon';
import SoilSalinityStats from '../Stats/Alpha/Soil/SoilSalinity';
import SoilTDSStats from '../Stats/Alpha/Soil/SoilTDS';
import SoilVWCStats from '../Stats/Alpha/Soil/SoilVWC';
import SoilTemperatureStats from '../Stats/Alpha/Soil/SoilTemperature';
import AirTemperatureStats from '../Stats/Alpha/Air/AirTemperature';
import AirGasQualityStats from '../Stats/Alpha/Air/AirGasQuality';
import AirHumidityStats from '../Stats/Alpha/Air/AirHumidity';
import SoilChart from '../Alpha/SoilChart';
import Air from '../Alpha/Air';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
            <div className="text-value">Soil Node Statistics</div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="4" lg="4">
            <SoilECStats/>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <SoilEpsilonStats/>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <SoilSalinityStats/>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="4" lg="4">
            <SoilTDSStats/>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <SoilVWCStats/>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <SoilTemperatureStats/>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" lg="12">
            <div className="text-value">Air Node Statistics</div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="4" lg="4">
            <AirTemperatureStats/>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <AirGasQualityStats/>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <AirHumidityStats/>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <Row>
                <Col xs="12" sm="12" lg="12">
                  <div className="text-value">Soil Chart</div>
                </Col>
                </Row>
                <SoilChart/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card>
              <CardBody>
                <Row>
                <Col xs="6" sm="6" lg="6">
                  <div className="text-value">Air Chart</div>
                </Col>
                </Row>
                <br/>
                <Air/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    );
  }
}

export default Dashboard;
