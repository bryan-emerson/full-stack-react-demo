import React from 'react'
export default class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {...this.props.data},
        }
    }
    render() {
        return (
            <div>
                <h1>Are you sure you want to delete this bookmark: {this.state.data.name}?</h1>
                <button onClick={()=>this.props.deleteBookmark(this.state.data._id)}>YES</button><br/>
                <button onClick={()=>this.props.redirect('index')}>NO</button><br/>
            </div>)
    }
}