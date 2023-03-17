// This page shows up when 404 Not Found happens

import notfoundImage from "../img/notfound.png";

const NotFound = () => {
    return (
        <div>
            <h1>Page not found</h1>
            <img src={notfoundImage} alt="404 Not Found" />
        </div>
    )
}

export default NotFound;