import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Widget02 from "../Widgets/Widget02";
import axios from "axios";

export default class WeatherStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: {},
      windSpeed: {},
      humidity: {},
      pressure: {}
    };
  }

  async componentDidMount() {
    try {
      const data = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=Surabaya&APPID=c6f7690e32550ceb66016fec73a3b510`
      );
      if (!data) {
        throw new Error("Terdapat kesalahan.");
      }
      this.setState({
        temp: data.data.main.temp,
        pressure: data.data.main.pressure,
        humidity: data.data.main.humidity,
        windSpeed: data.data.wind.speed
      });
    //   console.log(this.state.Data.data.main.temp);
    } catch (err) {
      throw err;
    }
  }

  render() {
    return (
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Widget02
            header={this.state.temp.toString()}
            mainText="Temperature"
            icon="fa fa-thermometer-half"
            color="primary"
            variant="2"
            footer
            link="#/"
          />
        </Col>
        <Col xs="12" sm="6" lg="3">
          <Widget02
            header={this.state.windSpeed.toString()}
            mainText="Wind Speed"
            icon="fa fa-cloud"
            color="success"
            variant="2"
            footer
            link="#/"
          />
        </Col>
        <Col xs="12" sm="6" lg="3">
          <Widget02
            header={this.state.humidity.toString()}
            mainText="Humidity"
            icon="fa fa-tint"
            color="warning"
            variant="2"
            footer
            link="#/"
          />
        </Col>
        <Col xs="12" sm="6" lg="3">
          <Widget02
            header={this.state.pressure.toString()}
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
