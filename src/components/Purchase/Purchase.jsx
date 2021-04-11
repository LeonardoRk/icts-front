import { Component } from 'react';
import PurchaseService from './PurchaseService'
import ProductService from '../Product/ProductService'
import { Button } from 'react-bootstrap'
import { CompleteModal } from '../modal'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'
import { YesNoModal } from '../modal'

class Purchase extends Component {

    fields = ["Id", "Valor", "Opções"];

    constructor(props) {
        super(props)
        this.state = {
            purchases: [],
            products: [],
            showYesNo: false,
            selectedPurchase: null,
            purchaseId: null,
            openComplete: false,
            modeComplete: null
        }
    }

    async componentDidMount() {
        const products = await ProductService.listAllProducts();
        const purchases = await PurchaseService.listAllPurchases()
        this.setState({
            purchases: purchases, products: products,
            selectedPurchase: null, openComplete: false
        })
    }

    openCompleteModal(option, index) {
        const modeComplete = option
        if (option === "view" && index !== null) {
        } else if (option === "create" && index === null) {
            const openComplete = this.state.openComplete
            const selectedPurchase = null;
            this.setState({ openComplete: !openComplete, modeComplete, selectedPurchase })
        }
    }

    closeCompleteModal() {
        this.setState({
            openComplete: false,
            selectedPurchase: null,
            modeComplete: null
        })
    }

    afterPurchaseCreated(purchase) {
        console.log(purchase)
        if (purchase !== null) {
            let purchases = this.state.purchases;
            purchases.push(purchase)
            this.setState({ purchases })
        }
    }

    hideYesNoModal() {
        this.setYesNoModal(null)
    }

    async deletePurchase() {
        if(this.state.selectedPurchase != null) {
            if(this.state.purchases[this.state.selectedPurchase] != null) {
                const purchaseToDelete = this.state.purchases[this.state.selectedPurchase];
              
                const data = await PurchaseService.deletePurchase(purchaseToDelete.id)
                if(data != null) {
                    let jsonData = JSON.parse(JSON.stringify(data));
                        if(jsonData.hasOwnProperty("message")) {
                        if(Number(jsonData.message) === Number(purchaseToDelete.id)) {
                            this.state.purchases.splice(this.state.selectedPurchase, 1)
                            this.setState({ selectedPurchase: null, showYesNo: false }
                            )
                        }
                    }
                }
            }
        }
    }

    setYesNoModal(selectedPurchaseIndex) {
        console.log(selectedPurchaseIndex)
        const lastState = this.state.showYesNo
        let purchaseId = null
        if(selectedPurchaseIndex !== null) {
            purchaseId = this.state.purchases[selectedPurchaseIndex].id;
        }
        console.log(purchaseId);
        this.setState({
            showYesNo: !lastState,
            selectedPurchase: selectedPurchaseIndex,
            purchaseId: purchaseId,
            openComplete: false,
            modeComplete: null
        })
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
                            <TableHeader fields={this.fields} />
                            <TableBody type={this.props.type}
                                setYesNoVisible={this.setYesNoModal.bind(this)}
                                openCompleteModal={this.openCompleteModal.bind(this)}
                                items={this.state.purchases} />
                        </table>

                        <YesNoModal type={this.props.type} show={this.state.showYesNo} 
                            purchaseId={this.state.purchaseId}
                            handleClose={this.hideYesNoModal.bind(this)}
                            confirm={this.deletePurchase.bind(this)} />

                        <CompleteModal type={this.props.type}
                            purchase={this.state.selectedPurchase}
                            products={this.state.products}
                            mode={this.state.modeComplete}
                            show={this.state.openComplete}
                            afterCreate={this.afterPurchaseCreated.bind(this)}
                            close={this.closeCompleteModal.bind(this)} />
                    </section>
                }
            </section>
        );
    }
}

export default Purchase;