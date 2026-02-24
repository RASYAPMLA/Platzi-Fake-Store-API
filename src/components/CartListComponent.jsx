import CardCategoryComponent from "./CardCategoryComponent";
import CardProductComponent from "./CardProductComponent";

export default function CardListComponent({ data,type,children }) {
    return (
        <div className="block mx-auto w-4xl">
            {children}
            <div className="grid grid-cols-4 gap-4 my-15">

            
            {
                data.map((item, index) => type == "category" ? (
                    <CardCategoryComponent item={item} key={index} />
                ) : (
                    <CardProductComponent item={item} key={index} />
            ))
            }
            </div>
        </div>
    )
}