

const Breadcrumbs = ({ path }) =>{

    return (
        // <p>empty</p>
        <p>{path.map((location, index) => (
            <a href={location.loc}>{index+1 === path.length ?`${location.string}`: `${location.string} > `}</a>
        ))}</p>
    )
}

export default Breadcrumbs