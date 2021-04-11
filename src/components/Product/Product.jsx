import { Component } from 'react';
import ProductService from './ProductService'
import './product.css'

import TableHeader from '../TableHeader';
import TableBody from '../TableBody'
import YesNoModal from '../YesNoModal'

class Product extends Component {

    fields = ["Id", "Nome", "Opções"];

    constructor() {
        super();
        this.showYesNo = false;
        this.state = {
            products: [],
            showYesNo: false,
            selectedProduct: null,
            productName: null
        };
    }

    async componentDidMount() {
        const data = await ProductService.listAllProducts()
        console.log(data);
        this.setState({products: data})
    }

    setYesNoModal(selectedProductIndex) {
        const lastState = this.state.showYesNo
        const productName = this._getSelectedProductName(selectedProductIndex)
        this.setState({
            showYesNo : !lastState, 
            selectedProduct: selectedProductIndex,
            productName: productName
        })
    }

    _getSelectedProductName(index) {
        let productName = null
        if(index !== null) {
            if(this.state.products[index] !== null) {
                productName = this.state.products[index].nome;
            }
        }
        return productName;
    }

    hideModal() {
        this.setYesNoModal(null)
    }

    async deleteUser() {
        if(this.state.selectedProduct != null) {
            if(this.state.products[this.state.selectedProduct] != null) {
                const productToDelete = this.state.products[this.state.selectedProduct];
                const data = await ProductService.deleteProduct(productToDelete.id)
                if(data != null) {
                    let jsonData = JSON.parse(JSON.stringify(data));
                        if(jsonData.hasOwnProperty("message")) {
                        if(Number(jsonData.message) === Number(productToDelete.id)) {
                            this.state.products.splice(this.state.selectedProduct, 1)
                            this.setState({ selectedProduct: null, showYesNo: false }
                            )
                        }
                    }
                }
            }
        }
    }

    render() {
        return (
            <section>
                <table >
                    <TableHeader fields={this.fields} />
                    <TableBody setYesNoVisible={this.setYesNoModal.bind(this)}  
                                items={this.state.products} />
                </table>

                <YesNoModal show={this.state.showYesNo} 
                            productName={this.state.productName}
                            handleClose={this.hideModal.bind(this)}
                            confirm={this.deleteUser.bind(this)} />
            </section>
        );
    }
}

export default Product;