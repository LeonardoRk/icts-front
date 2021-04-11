import { Component } from 'react';
import PurchaseService from './PurchaseService'
import ProductService from '../Product/ProductService'
import { Button } from 'react-bootstrap'
import { CompleteModal } from '../modal'

class Purchase extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            purchases: [],
            products: []
        }
    }

    async componentDidMount() {
        const products = await ProductService.listAllProducts();
        const purchases = await PurchaseService.listAllPurchases()
        console.log(purchases);
        this.setState({ purchases: purchases, products: products,
            selectedPurchase: null, openComplete: false })
    }

    openCompleteModal(option, index) {
        console.log("abrir modal completa")
        const modeComplete = option
        if(option === "view" && index !== null) {
            console.log("view")
        } else if(option === "create" && index === null) {
            console.log("modo create")
            const openComplete = this.state.openComplete
            const selectedPurchase = null;
            this.setState({openComplete: !openComplete, modeComplete, selectedPurchase})
        }
    }

    closeCompleteModal() {
        this.setState({openComplete : false, 
            selectedPurchase: null, 
            modeComplete: null})
    }

    render() {
        return (
            <section>
                {this.state.products.length === 0 ? "Primeiro cadastre algum produto"
                    :
                    <section>
                        <Button className="mt-2 mb-2"
                            onClick={() => this.openCompleteModal("create", null)}>
                            Comprar
                        </Button>
                        <table >

                        </table>

                        <CompleteModal type={this.props.type}
                                 purchase={this.state.selectedPurchase}
                                 products={this.state.products}
                                 mode={this.state.modeComplete} 
                                show={this.state.openComplete} 
                                close={this.closeCompleteModal.bind(this)} />
                    </section>
                }
            </section>
        );
    }
}

export default Purchase;