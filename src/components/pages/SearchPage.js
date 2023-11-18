import { Link, useParams } from "react-router-dom";
import Header from "../Layout/Header";
import { fecthCategorie } from "../../util/http";
import { useQuery } from "@tanstack/react-query";
import CardItems from "../UI/CardItems";
import { useState } from "react";
import Cart from "../Cart/Cart";

const SearchPage = () => {
    const routeObj = useParams()
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true)
      }
    
    const hideCartHandler = () => {
        setCartIsShown(false)
    }

    let content;

    const { data, isPending, isError } = useQuery({
        queryKey: ['categories', routeObj.search],
        queryFn: ({ signal }) => fecthCategorie({ signal, categorie: routeObj.search })
    })

    if (isPending) {
        content = (<p>Loading data...</p>)
    }

    if (isError) {
        content = (<p>There has been an error while fetching the data</p>)
    }

    if (data) {
        content = (data.map((item) => <CardItems title={item.title} img={item.image} text={item.description} price={item.price} id={item.id}/>))
    }

    return(
        <main>
            {cartIsShown && <Cart onClose={hideCartHandler}/>}
            <Header onShowCart={showCartHandler}/>
            <div className='categoriecard__grid'>
                {content}
            </div>
            <div className="categoriecard__returnbtn">
                <Link to="/">
                    <button className="categoriecard__returnbtn-btn">Return to Main Page</button>
                </Link>
            </div>
        </main>
    )
}

export default SearchPage;
