import { Component } from 'react'
import './completeModal.css'
import { Modal, Button} from 'react-bootstrap';
import Form from '../../Form'

class CompleteModal extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            checkShow: "complete_modal not-show",
            headerText: "",
            editable: false
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.props)
        if(prevProps.show !== this.props.show) {
            this.setState({checkShow : this.props.show ? " complete_modal show" : "complete_modal not-show"})
        
            if(this.props.mode != null) {
                if(this.props.mode === "view" && this.props.product)
                    this.setState(
                        {headerText: `Visualizar produto de id: ${this.props.product.id}`, 
                        editable:false})
                else if(this.props.mode === "create" && this.props.product === null)
                    this.setState(
                    {headerText: "Criar novo produto", 
                    editable:true})
            }
        }
    }
    render() {
        return(
            <section className={this.state.checkShow}>
                <Modal.Dialog >
                    <Modal.Header onClick={this.props.close} closeButton>
                        <Modal.Title>{this.state.headerText}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form readOnly={!this.state.editable}
                                product={this.props.product} />
                    </Modal.Body>
                </Modal.Dialog>
            </section>
        );
    }
}

export default CompleteModal