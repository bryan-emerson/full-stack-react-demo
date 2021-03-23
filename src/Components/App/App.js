
import React from 'react';
import './App.css';
import Navigation from '../Navigation'
import Index from '../IndexPage'
import Detail from '../Detail'
import Edit from '../Edit'
import Delete from '../Delete'
class App extends React.Component {

  constructor() {
    super()
    this.state = {
      allBooks: [],
      currentPage: "index",
      currentBook: "",
      bookmarkToEdit: "",
      bookmarkToDelete: ""
    }
  }
  handleGetAllBookMarks = () => {
    // console.log("getting api data")
    fetch('https://sei41-deployment-jws.herokuapp.com/bookmarks', { method: 'GET' })
      .then(response => response.json())
      .then(bookmarks => {
        // console.log('Success:', bookmarks);
        this.setState({ allBooks: bookmarks, currentPage: "Index" })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  handleUpdateBookmarks = (data) => {
    const { name, url, _id } = data
    const updated = { name, url }
    fetch('https://sei41-deployment-jws.herokuapp.com/bookmarks/' + _id,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updated)
        }).then(response=>response.json())
        .then(parsedJSON=>{
          this.setState({allBooks: [...this.state.allBooks].map(bookmark=>bookmark._id===parsedJSON._id ? parsedJSON: bookmark), currentPage: "Index"})
        })
  }
  handleDeleteBookmarks = (id) => {
    fetch('https://sei41-deployment-jws.herokuapp.com/bookmarks/' + id,
        {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(response=>response.json())
        .then(
          this.setState({allBooks: [...this.state.allBooks].filter(bookmark=>bookmark._id!==id ? bookmark: null), currentPage: "Index"})
        )
  }

  setCurrentPageToEdit = (bookmark) => this.setState({ bookmarkToEdit: bookmark, currentPage: "edit" })
  handleSwitchPage = (page) => this.setState({ currentPage: page })
  handleSetCurrent = (id) => this.setState({ currentBook: id, currentPage: "detail" })
  handleSetEdit = (data) => this.setState({ bookmarkToEdit: data, currentPage: "edit" })
  handleSetDelete = (data) => this.setState({ bookmarkToDelete: data, currentPage: "delete" })

  handleCurrentPage = data => {
    const { currentPage } = { ...data }
    if (currentPage.toLowerCase() === "index") {
      return <Index bookmarks={this.state.allBooks} setDetail={this.handleSetCurrent} />
    } else if (currentPage.toLowerCase() === "detail") {
      return <Detail id={this.state.currentBook} setEdit={this.handleSetEdit} triggerDelete={this.handleSetDelete} />
    } else if (currentPage.toLowerCase() === "edit") {
      return <Edit data={this.state.bookmarkToEdit} updateBookmarks={this.handleUpdateBookmarks} triggerDelete={this.handleSetDelete}/>
    } else if (currentPage.toLowerCase() === "delete") {
      return <Delete data={this.state.bookmarkToDelete} deleteBookmark={this.handleDeleteBookmarks} redirect={this.handleSwitchPage}/>
    } else return <div>404</div>
  }
  componentDidMount() {
    this.handleGetAllBookMarks()
  }
  render() {
    const currentPage = this.handleCurrentPage(this.state)
    return (
      <div className="App">
        <Navigation switchPage={this.handleSwitchPage} />
        <div>{currentPage}</div>
      </div>
    );
  }
}
export default App;
