import React from 'react';
import axios from 'axios';

export default class PotNodeList extends React.Component {
    constructor() {
        super();
        this.state = {
            potNodes: []
        };
    }

    async componentDidMount() {
        await axios.get('http://aizd.herokuapp.com/api/v1/pot-nodes')
        .then(res => {
            const potNodes = res.data;
            this.setState({ potNodes });
            console.log(potNodes);
        })
    }

    render() {
        return (
            <ul>
                { 
                    this.state.potNodes.map(function(potNode, i ) {
                        return <li key={i}>{ potNode.name }</li>
                    }) 
                }
            </ul>
        )
    }
}