import { Component } from 'react';
import ProductService from './ProductService'
import './product.css'

import TableHeader from '../TableHeader';
import TableBody from '../TableBody'
import { YesNoModal } from '../modal'
import { CompleteModal } from '../modal'
import { Button } from 'react-bootstrap'

class Product extends Component {

    fields = ["Id", "Nome", "Opções"];
 
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            showYesNo: false,
            selectedProduct: null,
            productName: null,
            openComplete: false,
            modeComplete: null
        };
    }

    async componentDidMount() {
        const data = await ProductService.listAllProducts()
        this.setState({products: data})
    }

    setYesNoModal(selectedProductIndex) {
        const lastState = this.state.showYesNo
        const productName = this._getSelectedProductName(selectedProductIndex)
        this.setState({
            showYesNo : !lastState, 
            selectedProduct: selectedProductIndex,
            productName: productName,
            openComplete:false,
            modeComplete:null
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

    hideYesNoModal() {
        this.setYesNoModal(null)
    }

    openCompleteModal(option, index) {
        const modeComplete = option
        if(option === "view" && index !== null) {
            const openComplete = this.state.openComplete
            const selectedProduct = this.state.products[index]
            this.setState({openComplete: !openComplete, modeComplete, selectedProduct})
        } else if(option === "create" && index === null) {
            const openComplete = this.state.openComplete
            const selectedProduct = null;
            this.setState({openComplete: !openComplete, modeComplete, selectedProduct})

        }
    }

    closeCompleteModal() {
        this.setState({openComplete : false, 
            selectedProduct: null, 
            modeComplete: null})
    }

    afterCreateProduct(product) {
        if(product !== null) {
            let products = this.state.products
            products.push(product)
            this.setState({products})
        }
    }

    async deleteProduct() {
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
                <Button className="mt-2 mb-2"
                    onClick={() => this.openCompleteModal("create", null)}>
                    Criar Produto
                </Button>
                <table >
                    <TableHeader fields={this.fields} />
                    <TableBody type={this.props.type}
                            setYesNoVisible={this.setYesNoModal.bind(this)}  
                                openCompleteModal={this.openCompleteModal.bind(this)}
                                items={this.state.products} />
                </table>

                <YesNoModal type={this.props.type} show={this.state.showYesNo} 
                            productName={this.state.productName}
                            handleClose={this.hideYesNoModal.bind(this)}
                            confirm={this.deleteProduct.bind(this)} />

                <CompleteModal  type={this.props.type}
                              product={this.state.selectedProduct}
                                 mode={this.state.modeComplete} 
                                show={this.state.openComplete} 
                                afterCreate={this.afterCreateProduct.bind(this)}
                                close={this.closeCompleteModal.bind(this)} />
            </section>
        );
    }
}

export default Product;