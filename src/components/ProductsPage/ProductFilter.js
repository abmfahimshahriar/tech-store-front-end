import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../../context';

const ProductFilter = () => {
    return (
        <ProductConsumer>
            {value => {
                const {
                    search,
                    minPrice,
                    maxPrice, company, 
                    price, 
                    shipping, 
                    handleChange, 
                    storeProducts 
                } = value;

                let companies = new Set();
                companies.add("all");
                for(let product in storeProducts){
                    companies.add(storeProducts[product]["company"]);
                }
                companies = [...companies];
                
                return (
                    <div className="row my-5">
                    <div className="col-10 mx-auto">
                    <FilterWrapper>
                    {/* Text search */}
                    <div>
                    <label htmlFor="search">Search Products </label>
                    <input 
                        type="text"
                        name="search"
                        id="search"
                        onChange={handleChange}
                        value={search}
                        className="filter-item"
                    />
                    </div>
                    {/* End of Text search */}

                    {/* select search */}
                    <div>
                    <label htmlFor="company">Company</label>
                    <select
                        name="company"
                        id="company"
                        onChange={handleChange}
                        className="filter-item"
                        value={company}
                    >
                    {
                        companies.map((company,index) => {
                            return (
                                <option key={index} value={company}>
                                {company}
                                </option>
                            );
                        })
                    }
                    </select>
                    </div>
                    {/* end of select search */}

                    {/* price search */}
                    <div>
                    <label htmlFor="price">
                    <p className="mb-2">
                    product price : <span> ${price}</span>
                    </p>
                    </label>
                    <input
                        type="range"
                        name="price"
                        id="price"
                        min={minPrice}
                        max={maxPrice}
                        className="filter-price"
                        value={price}
                        onChange={handleChange}
                    />
                    </div>
                    {/* end of price search */}

                    {/* checkbox search */}
                    <div>
                    <label htmlFor="shipping" className="mx-2">Free Shipping</label>
                    <input
                        type="checkbox"
                        id="shipping"
                        name="shipping"
                        onChange={handleChange}
                        checked={shipping && true}
                    />
                    </div>
                    {/* end of checkbox search */}
                    </FilterWrapper>
                    </div>
                    </div>
                );
            }}
        </ProductConsumer>
    );
}

const FilterWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column-gap: 2rem;
    grid-row-gap: 1rem;

    label {
        font-weight: bold;
        text-transform: capitalize;
    }

    .filter-item,
    .filter-price {
        display: block;
        width: 100%;
        background: transparent;
        border-radius: 0.5rem;
        border: 2px solid var(--darkGrey);
    }
`

export default ProductFilter;