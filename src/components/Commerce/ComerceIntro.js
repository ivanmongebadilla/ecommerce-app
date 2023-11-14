import '../../style/style.css';
import CommerceSummary from './CommerceSummary';
// import AvailableMeals from './AvailableMeals';
import { Fragment } from 'react';
import CategorieCard from '../UI/CategorieCard';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../util/http';

const ComerceIntro = () => {
    let content;
    const { data, isPending, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 1000000,
    })

    if (isPending) {
        content = (<p>Loading Categories...</p>)
    }

    if (isError) {
        content = (<p>There has been an error while fetching categories</p>)
    }

    if (data) {
        content = (
            data.map((item) => <CategorieCard categorie={item} key={item} />)
        )

    }

    return (
        <Fragment>
            <CommerceSummary />
            {/* <AvailableMeals /> */}
            <div className='categoriecard__container'>
                {content}
            </div>
        </Fragment>
    )
}

export default ComerceIntro;