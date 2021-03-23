export default function Navigation(props) {
    return (
        <div className="navigation-header">
            <div onClick={()=>props.switchPage("Index")}>
                LOGO
            </div>
            <nav>
                <li onClick={()=>props.switchPage("detail")} className="nav-link">Detail</li>
                <li onClick={()=>props.switchPage("edit")} className="nav-link">Edit</li>
                <li onClick={()=>props.switchPage("delete")} className="nav-link">Delete</li>
            </nav>
        </div>
)}