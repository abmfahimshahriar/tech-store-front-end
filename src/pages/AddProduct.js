import React from 'react';
import {ProductConsumer} from '../context';


const AddProduct = () => {
    
    return(
        <ProductConsumer>
        {value => {
            let {
                handleChangeAddProduct,
                addProductHandler,
                addCompany,
                addDescription,
                addFeatured,
                addFreeShipping,
                addPrice,
                addTitle,
                isEditing
            } = value;
            
            
            
            return (
                <div className="col-5 py-5">
                    <form>
                        <div className="form-group">
                            <label htmlFor="addTitle">Title</label>
                            <input
                                type="text"
                                name="addTitle"
                                id="addTitle"
                                onChange={handleChangeAddProduct}
                                value={addTitle}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addCompany">Company</label>
                            <input
                                type="text"
                                name="addCompany"
                                id="addCompany"
                                onChange={handleChangeAddProduct}
                                value={addCompany}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addPrice">Price</label>
                            <input
                                type="number"
                                name="addPrice"
                                id="addPrice"
                                onChange={handleChangeAddProduct}
                                value={addPrice}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addFeatured">Featured</label>
                            <input
                                type="checkbox"
                                name="addFeatured"
                                id="addFeatured"
                                onChange={handleChangeAddProduct}
                                className="form-control"
                                checked={addFeatured && true}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addFreeShipping">Free Shipping</label>
                            <input
                                type="checkbox"
                                name="addFreeShipping"
                                id="addFreeShipping"
                                onChange={handleChangeAddProduct}
                                className="form-control"
                                checked={addFreeShipping && true}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addImage">image</label>
                            <input
                                type="file"
                                name="addImage"
                                id="addImage"
                                onChange={handleChangeAddProduct}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addDescription">Description</label>
                            <textarea
                                className="form-control"
                                name="addDescription"
                                rows="10"
                                value={addDescription}
                                onChange={handleChangeAddProduct}
                                placeholder="Type your description here" />
                        </div>
    
                        <button onClick={addProductHandler} className="btn btn-primary">{isEditing? "Update Product" : "Add Product"}</button>
                    </form>
                </div>
            );
        }}
        </ProductConsumer>
    );
    
}

export default AddProduct;
