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

import SoilTemperatureStats from '../Stats/PotNode/SoilTemperatureStats';
import SoilMoistureStats from '../Stats/PotNode/SoilMoistureStats';
import EnvironmentHumidityStats from '../Stats/GreenHouseNode/EnvironmentHumidityStats';
import EnvironmentTemperatureStats from '../Stats/GreenHouseNode/EnvironmentTemperatureStats';
import AirQualityStats from '../Stats/GreenHouseNode/AirQualityStats';
import LightIntensityStats from '../Stats/GreenHouseNode/LightIntensityStats';
import WaterTurbidityStats from '../Stats/PompNode/WaterTurbidityStats';
import WaterPhStats from '../Stats/PompNode/WaterPhStats';
import WaterFlowStats from '../Stats/PompNode/WaterFlowStats';
import PotNodeChart from '../Charts/PotNodeChart';
import PompNodeChart from '../Charts/PompNodeChart';
import GreenHouseNodeChart from '../Charts/GreenHouseNodeChart';

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
        <h1>UNDER CONSTRUCTION ):</h1>
        {/* <Row>
          <Col xs="12" sm="12" lg="12">
            <div className="text-value">Pots Node Statistics</div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="6">
            <SoilTemperatureStats/>
          </Col>

          <Col xs="12" sm="6" lg="6">
            <SoilMoistureStats/>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" lg="12">
            <div className="text-value">Green House Node Statistics</div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <EnvironmentHumidityStats/>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <EnvironmentTemperatureStats/>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <LightIntensityStats/>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <AirQualityStats/>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" lg="12">
            <div className="text-value">Pomp Node Statistics</div>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="4">
            <WaterTurbidityStats/>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <WaterPhStats/>
          </Col>

          <Col xs="12" sm="6" lg="4">
            <WaterFlowStats/>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                <Col xs="12" sm="12" lg="12">
                  <div className="text-value">Pot Node Chart</div>
                </Col>
                </Row>
                <PotNodeChart/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
              <Row>
                <Col xs="12" sm="12" lg="12">
                  <div className="text-value">Greenhouse Node Chart</div>
                </Col>
                </Row>
                <GreenHouseNodeChart/>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                <Col xs="12" sm="12" lg="12">
                  <div className="text-value">Pomp Node Chart</div>
                </Col>
                </Row>
                <PompNodeChart/>
              </CardBody>
            </Card>
          </Col>
        </Row>
         */}
      </div>
    );
  }
}

export default Dashboard;
