import { Component } from 'react';
import './yesNoModal.css'
import { Modal, Button } from 'react-bootstrap';

class YesNoModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showHideClassName: "yes-no_modal display-none",
            content: ""
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            let content = "";
            if (this.props.productName != null) {
                content = `Deseja excluir produto ${this.props.productName} ?`
            } else if (this.props.purchaseId !== null) {
                content = `Deseja excluir compra com id ${this.props.purchaseId} ?`
            }
            this.setState(
                {
                    showHideClassName: this.props.show ? "yes-no_modal display:display-block"
                        : "yes-no_modal yes-no_display-none",
                    content: content
                }
            )
        }


    }

    componentDidMount() {
        this.setState(
            {
                showHideClassName: this.props.show ? "modal display-block"
                    : "modal display-none"
            }
        )
    }

    render() {
        return (
            <div className={this.state.showHideClassName}>
                <Modal.Dialog >
                    <Modal.Header onClick={this.props.handleClose} closeButton>
                        <Modal.Title>Excluir {this.props.type === 'product'? "produto" : "compra"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    {this.state.content}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.handleClose} variant="secondary">Não</Button>
                        <Button onClick={this.props.confirm} variant="danger">Excluir</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div >
        );
    }
}

export default YesNoModal;