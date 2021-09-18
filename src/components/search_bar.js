import React from "react";

export default class Search_bar extends React.Component{
    state = {
        text = ""
    };

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit()}>
                <input onChange={(value) => this.setState({text: value})}></input>
                <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}