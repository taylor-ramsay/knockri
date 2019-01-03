import React, { Component } from 'react'
import axios from 'axios'
import uuidv1 from 'uuid/v1';
import ReactPlayer from 'react-player'
import Comments from './Comments'

export default class CandidateResponses extends Component {

    constructor() {
        super()
        this.state = {
            application: {
                id: null,
                videos: [{
                    src: null,
                    questionId: null,
                    comments: null
                }]
            },
            questions: [{
                id: null,
                question: null
            }]
        }
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps !== this.props) {
            axios.get('http://localhost:3010/applications').then((res) => {
                let allApplications = res.data
                let selectedApplication = allApplications.filter((application) => {
                    return application.id === this.props.selectedCandidateApplicationId
                })
                let applicationObj = selectedApplication[0]
                this.setState({
                    application: { ...applicationObj }
                }, ()=>{
                    if (applicationObj && applicationObj.id) {
                        axios.get('http://localhost:3010/questions').then((res) => {
                            let allQuestions = res.data
                            let videoApplications = applicationObj.videos
                            let selectedQuestions = []
                            for (let question of allQuestions) {
                                for (let video of videoApplications) {
                                    if (question.id === video.questionId) {
                                        selectedQuestions.push(question)
                                    }
                                }
                            }
                            this.setState({
                                questions: [...selectedQuestions]
                            })
                        })
                    }
                })
            })
        }
    }

    render() {
        let candidateResponsesJSX = null
        if (this.state.application.id) {
            candidateResponsesJSX = this.state.application.videos.map((response) => { 
                let respondedQuestion = this.state.questions.find((question) => {
                    return question.id === response.questionId
                })
                if(respondedQuestion){
                    return (
                        <div>
                            <h4>{respondedQuestion.question}</h4>
                            <center><ReactPlayer width="100%" url={response.src} controls={true} /></center>
                            <Comments currentApplicationId={this.state.application.id} questionId={respondedQuestion.id} src={response.src} comments={response.comments} videos={this.state.application.videos} /> 
                        </div>
                    )
                }
            })
        }
        return (
            <div>
                <h2>{this.props.selectedCandidateName}</h2>
                {candidateResponsesJSX ? candidateResponsesJSX : <h4>No responses found for this candidate.</h4>}
            </div>
        )
    }
}
