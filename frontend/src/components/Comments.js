import React, { Component } from 'react'
import axios from 'axios'
import { Input, Row, Button } from 'react-materialize'

export default class Comments extends Component {

    constructor() {
        super()
        this.state = {
            commentInput: "",
            applications: {
                id: null,
                videos: [{
                    src: null,
                    questionId: null,
                    comments: null
                }]
            },
            saveButtonClicked: false,
            typing: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3010/applications/' + this.props.currentApplicationId).then((res) => {
            let applications = res.data
            this.setState({
                applications: { ...applications },
            })
        })
    }


    componentDidUpdate(previousProps, previousState) {
        if (previousProps !== this.props) {
            axios.get('http://localhost:3010/applications/' + this.props.currentApplicationId).then((res) => {
                let applications = res.data
                this.setState({
                    applications: { ...applications },
                    commentInput: ""
                })
            })

        }
    }

    componentWillUnmount() {
        this.setState({
            commentInput: "",
        })
    }

    handleCommentChange = (e) => {
        this.setState({
            commentInput: this.inputText.value,
            saveButtonClicked: false,
            typing: true
        })
    }

    handleOnBlur = (e) =>{
        this.inputText.value = "";
        this.setState({
            typing: false
        })
    }

    saveComment = () => {

        axios.get('http://localhost:3010/applications/' + this.props.currentApplicationId).then((res) => {
            let applications = res.data
            this.setState({
                applications: { ...applications },
            })
        }).then(()=>{
            let updatedQuestions = []
            for (let video of this.state.applications.videos) {
                if (video.questionId === this.props.questionId) {
                    let updatedComment = {
                        src: video.src,
                        questionId: video.questionId,
                        comments: this.state.commentInput
                    }
                    updatedQuestions.push(updatedComment)
                } else {
                    updatedQuestions.push(video)
                }
            }
            let updatedApplication = {
                id: this.props.currentApplicationId,
                videos: [...updatedQuestions]
            }
    
            axios.put('http://localhost:3010/applications/' + this.props.currentApplicationId, updatedApplication).then((res) => {
                this.inputText.value = ""
                this.setState({
                    saveButtonClicked: true,
                    typing: false
                })
            })
        })
    }

    render() {
        return (
            <div>
                <p>{ !this.state.typing ? (this.state.commentInput.length > 0 ? this.state.comments : this.props.comments) : null}</p>
                <input ref={el => this.inputText = el} placeholder="Enter comments on this video response." value={this.state.commentInput} onBlur={(e)=>{this.handleOnBlur(e)}} onChange={(e) => { this.handleCommentChange(e) }} />
                <center><Button s={12} onClick={(e) => this.saveComment(e)}>Save</Button><div>{this.state.saveButtonClicked ? <span className="greyed">Saved!</span> : null}</div></center>
            </div>
        )
    }
}
