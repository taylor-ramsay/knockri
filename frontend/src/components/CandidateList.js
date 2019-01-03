import React, { Component } from 'react'
import axios from 'axios'

export default class CandidateList extends Component {

    constructor() {
        super()
        this.state = {
            candidates: [{
                id: null,
                name: null,
                applicationId: null
            }]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3010/candidates').then((res) => {
            let candidates = res.data
            this.setState({
                candidates: [...candidates]
            })
        })
    }

    render() {
        let candidatesJSX = this.state.candidates.map((candidate)=>{
            return(
                <div>
                    <span className="candiatelistname" onClick={(e)=>{this.props.handleSelectedCandidateOnClick(e, candidate.applicationId, candidate.name)}}>{candidate.name} <span className="greyed">{candidate.id}</span></span>
                </div>
            )
        })
        return (
            <div>
            <h2>Candidates</h2>
            {candidatesJSX}
            </div>
        )
    }
}
