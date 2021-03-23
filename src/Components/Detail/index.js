import React from 'react'
export default class Detail extends React.Component {
    constructor(props) {
        super()
        this.state = {
            data: {},
            loading: true,
            id: props.id
        }
    }

    handleFetchData = (id) => {
        (fetch('https://sei41-deployment-jws.herokuapp.com/bookmarks/' + id, { method: 'GET' })
            .then(response => response.json())
            .then(bookmark => {
                // console.log('Success:', bookmark);
                this.setState({ data: bookmark, loading: false })
            })
            .catch((error) => {
                console.error('Error:', error);
            }))
    }
    componentDidMount() {
        this.handleFetchData(this.state.id)
    }
    render() {
        return (
            <div>{
                this.state.loading ?
                    <>DETAIL: id {this.state.id}</>
                    :
                    <>
                    <h1>{this.state.data.name}</h1>
                    <a href={this.state.data.url}>Direct Link</a>
                    <br/>
                    <button onClick={()=>this.props.setEdit(this.state.data)}>EDIT</button>
                    <br/>
                    <button onClick={()=>this.props.triggerDelete(this.state.data)}>Delete</button>
                    <br/>
                    </>}
            </div>)
    }
}
