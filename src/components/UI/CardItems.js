import { Card, CardImg, CardText, CardBody, CardTitle, Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const CardItems = (props) => {
    const cartCtx = useContext(CartContext);
    const [modal, setModal] = useState(false)

    const addToCartHandler = () => {
        cartCtx.addItem({
            id: props.id,
            name: props.title,
            amount: 1,
            price: props.price
        })
    }

    const modalHandler = () => {
        setModal(!modal)
    }

    return (
        <>
            <Card className="categoriecard__item">
                <CardBody>
                    <CardTitle>
                        {props.title}
                    </CardTitle>
                    <CardImg className="categoriecard__img" src={props.img} alt='Item' />
                    <CardText>
                        <h3>Price ${props.price}</h3>
                    </CardText>
                    <Button className="categoriecard__btn" onClick={modalHandler}>More</Button>
                    <Button className="categoriecard__btn" onClick={addToCartHandler}>Add</Button>
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={modalHandler} modalTransition={{ timeout: 300 }} className="categoriecard__modal">
                <ModalHeader toggle={modalHandler}>
                    <h2>{props.title}</h2>
                </ModalHeader>
                <ModalBody>
                    <h4>{props.text}</h4>
                    <img className="categoriecard__modal-img" src={props.img} alt='Item' />
                    <h3>Price ${props.price}</h3>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={modalHandler}>Go Back</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CardItems;