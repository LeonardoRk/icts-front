import { Component, createRef } from 'react'
import './completeModal.css'
import { Modal, Button } from 'react-bootstrap';
import { FormProduct, FormPurchase } from '../../Form'

class CompleteModal extends Component {

    constructor(props) {
        super(props);
        this.childRef = createRef();
        this.state = {
            checkShow: "complete_modal not-show",
            headerText: "",
            editable: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.setState({ checkShow: this.props.show ? " complete_modal show" : "complete_modal not-show" })

            if (this.props.mode != null) {
                if (this.props.mode === "view" && (this.props.product || this.props.purchase)) {
                    let headerText = "";
                    if (this.props.type === "product") {
                        headerText = `Visualizar produto de id: ${this.props.product.id}`
                    } else if (this.props.type == "purchase") {
                        headerText = `Visualizar compra de id: ${this.props.purchase.id}`
                    }
                    this.setState(
                        {
                            headerText,
                            editable: false
                        })
                }

                else if (this.props.mode === "create" && (this.props.product === null || this.props.purchase === null)) {
                    let headerText = "";
                    if (this.props.type === "product") {
                        headerText = "Criar novo produto"
                    } else if (this.props.type === "purchase") {
                        headerText = "Criar nova compra"
                    }
                    this.setState(
                        {
                            headerText,
                            editable: true
                        })
                }

            }
        }
    }

    render() {
        return (
            <section className={this.state.checkShow}>
                <Modal.Dialog >
                    <Modal.Header 
                        onClick={() => {
                            if(this.props.mode !== "view" && 
                                (this.props.mode !== "create" || this.props.type !== "product"))
                                this.childRef.current.resetState(); 
                            this.props.close()}} closeButton>
                        <Modal.Title>{this.state.headerText}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.type === "product" ?
                            <FormProduct readOnly={!this.state.editable}
                                product={this.props.product} 
                                afterCreate={this.props.afterCreate}
                                close={this.props.close}/>
                            :
                            null
                        }
                        {this.props.type === "purchase" ?
                            <FormPurchase ref={this.childRef}
                                readOnly={!this.state.editable}
                                products={this.props.products} 
                                close={this.props.close}
                                afterCreate={this.props.afterCreate}
                                purchase={this.props.purchase}/>
                            :
                            null
                        }
                    </Modal.Body>
                </Modal.Dialog>
            </section>
        );
    }
}

export default CompleteModal