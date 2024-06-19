
import { AppBar, Toolbar, Typography, styled} from '@mui/material';
import { Link } from 'react-router-dom';

const Component = styled(AppBar)`
    background: #898888;
    height : 64px;
    color: #fff;
`

const Container = styled(Toolbar)`
    display : flex;
    align-items: center;
    justify-content : center;
    & > a {
        text-decoration: none;
        color: inherit;
        padding: 10px 20px;
        margin: auto 40px;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        border: none;
        border-radius: 20px;
    }

    & > a:hover {
        cursor: pointer;
        color: rgba(0, 0, 0, 0.87);
        background-color: #f5f5f5 ;
    }

`

const Header = () =>{
    return (
        <Component position = "static">
            <Container>
                <Link>Home</Link>
                <Link>About</Link>
                <Link>Contact</Link>
                <Link>Logout</Link>
            </Container>
        </Component>
    )
}

export default Header;