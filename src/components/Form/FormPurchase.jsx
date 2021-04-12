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

    componentDidUpdate(prevProps) {
        if (prevProps.purchase != this.props.purchase) {
            if (this.props.purchase && this.props.purchase.Produtos) {
                console.log(this.props.purchase);
                let checkeds = this.props.purchase.Produtos.map(p => p.id)
                this.setState({ checkeds })
            }

            if(this.props.purchase) {
                this.setState({
                    status: this.props.purchase.status,
                    tipo_pagamento : this.props.purchase.tipo_pagamento,
                    total : this.props.purchase.total
                })
            }
        }
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

    async submitPurchase(e) {
        e.preventDefault();

        const purchase = {
            total: this.state.total,
            tipo_pagamento: this.state.tipo_pagamento,
            status: this.state.status,
            Produtos: this.state.checkeds
        }
        
        let p = null;
        let mode = "";
        if(this.props.mode === "create") {
            mode = "create"
            p = await PurchaseService.createPurchase(purchase);
        }else if (this.props.mode === "edit") {
            mode = "update"
            p = await PurchaseService.editPurchase(purchase, this.props.purchase.id);
        }
        if (p !== null) {
            this.resetState();
            this.props.close();
            this.props.afterCreate(p, mode);
        }

    }

    handleChange(event) {
        const id = event.target.id.replace("in-", "");
        let checks = this.state.checkeds;
        if (event.target.checked === false) {
            checks = checks.filter(i => Number(i) !== Number(id));
        } else {
            checks.push(Number(id))
        }
        this.setState({ checkeds: checks }, () => {
            this._evaluateTotal(this);
        })

    }

    _evaluateTotal() {
        let total = 0;
        if (this.state.checkeds.length !== 0) {
            this.state.checkeds.forEach((id) => {
                let p = _.find(this.props.products, _.matchesProperty('id', id))
                total += p.preco
            })
        }
        console.log(total)
        this.setState({ total: total })
    }

    handle(id) {
        console.log("mudando")
        return this.state.checkeds.filter((number) => number === id).length > 0
    }


    render() {
        return (
            <section>
                <Form onSubmit={this.submitPurchase.bind(this)}>

                    <Form.Group controlId="formHorizontalCheck">
                        {this.props.products.map((item) => (
                            <Form.Check disabled={this.props.readOnly} 
                                checked={this.handle(item.id)} 
                                key={item.id} onChange={this.handleChange.bind(this)} inline label={item.nome} type='checkbox' id={`in-${item.id}`} />
                        ))}
                    </Form.Group>



                    <Form.Group controlId="formBasicPaymentType">
                        <Form.Label>Total</Form.Label>
                        <Form.Control readOnly={true}
                            type="text" placeholder="Total"
                            onChange={this.setTotal.bind(this)}
                            value={this.state.total} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPaymentType">
                        <Form.Label>Tipo de pagamento</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="text" placeholder="Tipo de pagamento"
                            onChange={this.setTipoPagamento.bind(this)}
                            value={this.state.tipo_pagamento} />
                    </Form.Group>

                    <Form.Group controlId="formBasicStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="text" placeholder="Status"
                            onChange={this.setStatus.bind(this)}
                            value={this.state.status} />
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
                                    value={this.props.purchase ?
                                        this.props.purchase.createdAt
                                        : ""} />
                            </Form.Group>

                            <Form.Group controlId="formBasicUpdated">
                                <Form.Label>Atualizado em:</Form.Label>
                                <Form.Control readOnly={this.props.readOnly}
                                    type="text" placeholder="Atualizado em"
                                    value={this.props.purchase ? this.props.purchase.updatedAt : ""} />
                            </Form.Group>
                        </div>
                    }
                </Form>
            </section>
        )
    }
}

export default MyFormPurchase;