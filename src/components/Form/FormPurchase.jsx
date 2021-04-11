import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import PurchaseService from '../Purchase/PurchaseService';
import _ from 'lodash';

class MyFormPurchase extends Component {

    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            tipo_pagamento: "",
            status: "",
            checkeds: []
        };
    }

    resetState() {
        this.setState({
            total: 0,
            tipo_pagamento: "",
            status: "",
            checkeds: []
        })
    }

    setTotal(event) {
        this.setState({ total: event.target.value })
    }

    setTipoPagamento(event) {
        this.setState({ tipo_pagamento: event.target.value })
    }

    setStatus(event) {
        this.setState({ status: event.target.value })
    }

    createPurchase() {
        const purchase = {
            total: this.state.total,
            tipo_pagamento: this.state.tipo_pagamento,
            status: this.state.status,
            produtosId: this.state.checkeds
        }
        console.log(purchase);

        PurchaseService.createPurchase(purchase);
    }

    handleChange(event) {
        const id = event.target.id.replace("in-", "");
        let checks = this.state.checkeds;
        if(event.target.checked === false) {
            checks = checks.filter(i => Number(i) !== Number(id));
        } else {
            checks.push(Number(id))
        }
        console.log(checks.length)
        this.setState({checkeds: checks}, () => {
            this._evaluateTotal(this);
        })
        
    }

    _evaluateTotal() {
        let total = 0;
        if(this.state.checkeds.length !== 0) {
            this.state.checkeds.forEach((id) => {
                let p = _.find(this.props.products, _.matchesProperty('id', id))
                console.log(p)
                total += p.preco
            })
        } 
        this.setState({ total: total})
    }

    render() {
        return (
            <section>
                <Form onSubmit={this.createPurchase.bind(this)}>
                    <Form.Group controlId="formBasicProducts">
                        
                        {this.props.products.map((item) => (
                            <Form.Check key={item.id} onChange={this.handleChange.bind(this)} inline label={item.nome} type='checkbox' id={`in-${item.id}`} />
                        ))}
                    </Form.Group>
                    

                    <Form.Group controlId="formBasicPaymentType">
                        <Form.Label>Total</Form.Label>
                        <Form.Control readOnly={true}
                            type="text" placeholder="Total"
                            onChange={this.setTotal.bind(this)}
                            value={this.props.purchase ? this.props.purchase.total :
                                this.state.total} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPaymentType">
                        <Form.Label>Tipo de pagamento</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="text" placeholder="Tipo de pagamento"
                            onChange={this.setTipoPagamento.bind(this)}
                            value={this.props.purchase ? this.props.purchase.tipo_pagamento :
                                this.state.tipo_pagamento} />
                    </Form.Group>

                    <Form.Group controlId="formBasicStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="text" placeholder="Status"
                            onChange={this.setStatus.bind(this)}
                            value={this.props.purchase ? this.props.purchase.status :
                                this.state.status} />
                    </Form.Group>


                    {!this.props.readOnly ?
                        <Button disabled={this.state.total <= 0 || this.state.checkeds === [] 
                                || this.state.tipo_pagamento === "" || this.state.status === ""} 
                            variant="primary" type="submit">
                            Criar
                        </Button>
                        :
                        <div>
                            <Form.Group controlId="formBasicCreated">
                                <Form.Label>Criado em:</Form.Label>
                                <Form.Control readOnly={this.props.readOnly}
                                    type="text" placeholder="Criado em"
                                    value={this.props.product ?
                                        new Intl.DateTimeFormat('pt-br').format(new Date(this.props.product.createdAt))
                                        : ""} />
                            </Form.Group>

                            <Form.Group controlId="formBasicUpdated">
                                <Form.Label>Atualizado em:</Form.Label>
                                <Form.Control readOnly={this.props.readOnly}
                                    type="text" placeholder="Atualizado em"
                                    value={this.props.product ? new Intl.DateTimeFormat('pt-br').format(new Date(this.props.product.updatedAt)) : ""} />
                            </Form.Group>
                        </div>
                    }
                </Form>
            </section>
        )
    }
}

export default MyFormPurchase;