import React from 'react'
export default class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: { ...this.props.data }
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.props.updateBookmarks(this.state.data)
    }
    handleFormChange = e => this.setState({data: { ...this.state.data, [e.target.name]: e.target.value }})
    render() {

        return (
            <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="name">Enter New Bookmark Name</label>
                <input id="name" name="name" type="text" placeholder="enter bookmark name" value={this.state.data.name} required onChange={this.handleFormChange} />
                <br />
                <label htmlFor="url">Enter New URL Name</label>
                <input id="url" name="url" type="text" placeholder="enter url (without http://)" value={this.state.data.url} required onChange={this.handleFormChange} />
                <br/>
                <button type="submit">Submit Edits</button>
            </form>)
    }
}
