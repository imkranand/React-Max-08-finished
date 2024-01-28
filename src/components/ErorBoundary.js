import React, { Component } from 'react'

export class ErorBoundary extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(error) {
        console.log('Error Occured',error);
        this.setState({ hasError: true })
    }
    render() {
        if (this.state.hasError) {
            <p>Eror Occured</p>
        }
        this.props.children
    }

}

export default ErorBoundary