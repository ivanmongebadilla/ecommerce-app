import { fecthCategorie } from "../../util/http";
import CardItems from "../UI/CardItems";
import { useQuery } from "@tanstack/react-query";

const searchItems = () => {
    const { data, isPending, isError } = useQuery({
        queryKey: ['categories', props.section], 
        queryFn: ({ signal }) => fecthCategorie({signal, categorie: props.section} )
    })

    return (
        <CardItems />
    )
}

export default searchItems;