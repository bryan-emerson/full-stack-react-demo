export default function IndexPage(props) {
    return (<div>
        <h1>Bookmarks</h1>
        {props.bookmarks && props.bookmarks.map(bookmark => (
        <div onClick={()=>props.setDetail(bookmark._id)}key={bookmark._id} >{bookmark.name}</div>))}
        </div>)
}