import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';

const CategorieCard = (props) => {

    return (
        <div className="categoriecard">
            <Card>
                <CardBody>
                    <CardTitle>{props.categorie}</CardTitle>
                    {/* <CardText>Some text for the card</CardText> */}
                    <Button outline color="primary">
                        <Link to={props.categorie}>Search</Link>
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default CategorieCard;