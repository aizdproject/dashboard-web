import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Widget02 from "../Widgets/Widget02";
import axios from "axios";
import { host, query, appId } from "../../API/Weather";

export default class WeatherStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: {},
      clouds: {},
      status: {},
      mainStatus: {},
      pressure: {}
    };
  }

  async componentDidMount() {
    try {
      const data = await axios.get(`http://${host}?q=${query}&APPID=${appId}`);
      if (!data) {
        throw new Error("Terdapat kesalahan.");
      }
      this.setState({
        temp: data.data.main.temp - 273.15,
        pressure: data.data.main.pressure,
        status: data.data.weather[0].description,
        mainStatus: data.data.weather[0].main,
        clouds: data.data.clouds.all
      });
    } catch (err) {
      throw err;
    }
  }

  weatherStatus = main => {
    let status;

    switch (main) {
      case "Rain":
        status = "fa fa-tint";
        break;
      case "Clouds":
        status = "fa fa-cloud";
        break;
      default:
        status = "fa fa-sun-o";
    }

    return status;
  };

  render() {
    return (
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Widget02
            header={this.state.status.toString()}
            mainText="Status"
            icon={this.weatherStatus(this.state.mainStatus)}
            color="primary"
            variant="2"
            footer
            link="#/"
          />
        </Col>
        <Col xs="12" sm="6" lg="3">
          <Widget02
            header={this.state.temp.toString() + " " + String.fromCharCode(176) + "C"}
            mainText="Temperature"
            icon="fa fa-thermometer-half"
            color="warning"
            variant="2"
            footer
            link="#/"
          />
        </Col>
        <Col xs="12" sm="6" lg="3">
          <Widget02
            header={this.state.clouds.toString() + " %"}
            mainText="Clouds"
            icon="fa fa-cloud"
            color="success"
            variant="2"
            footer
            link="#/"
          />
        </Col>
        <Col xs="12" sm="6" lg="3">
          <Widget02
            header={this.state.pressure.toString() + " hpa"}
            mainText="Pressure"
            icon="fa fa-compress"
            color="danger"
            variant="2"
            footer
            link="#/"
          />
        </Col>
      </Row>
    );
  }
}
