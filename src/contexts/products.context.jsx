import { createContext, useState } from 'react';

import PRODUCTS from '../shop-data.json';

//firebase here to fetch json data

// create storage
export const ProductsContext = createContext({
    products: [],
    setProducts: () => {},
})

// create component
export const ProductsProvider = ({ children }) => {
    const [products] = useState(PRODUCTS);
    const value = { products };

    //useEffect here?

    // set state to default json data
    return <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
}