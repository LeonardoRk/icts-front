import { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import ProductService from '../Product/ProductService';

class MyFormProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: "",
            descricao: "",
            preco: ""
        };
    }

    setNome(event) {
        this.setState({ nome: event.target.value })
    }

    setDescricao(event) {
        this.setState({ descricao: event.target.value })
    }

    setPreco(event) {
        this.setState({ preco: event.target.value })
    }

    createProduct() {
        const product = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            preco: this.state.preco
        }
        ProductService.createProduct(product);
    }

    render() {
        return (
            <section>
                <Form onSubmit={this.createProduct.bind(this)}>
                    <Form.Group controlId="formBasicNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="text" placeholder="Nome"
                            onChange={this.setNome.bind(this)}
                            value={this.props.product ? this.props.product.nome :
                                this.state.nome} />
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="text" placeholder="Descrição"
                            onChange={this.setDescricao.bind(this)}
                            value={this.props.product ? this.props.product.descricao :
                                this.state.descricao} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="number" step="0.01" placeholder="Preço"
                            onChange={this.setPreco.bind(this)}
                            value={this.props.product ? this.props.product.preco :
                                this.state.preco} />
                    </Form.Group>

                    {!this.props.readOnly ?
                        <Button disabled={this.state.nome === "" || this.state.descricao === "" || this.state.preco === ""} 
                            variant="primary" type="submit">
                            Criar
                        </Button>
                        :
                        <div>
                            
                            <Form.Group controlId="formBasicCreated">
                                <Form.Label>Criado em:</Form.Label>
                                <Form.Control readOnly={this.props.readOnly}
                                    type="text" placeholder="Criado em"
                                    value={this.props.product !== null ?
                                        this.props.product.createdAt
                                        : ""} />
                            </Form.Group>

                            <Form.Group controlId="formBasicUpdated">
                                <Form.Label>Atualizado em:</Form.Label>
                                <Form.Control readOnly={this.props.readOnly}
                                    type="text" placeholder="Atualizado em"
                                    value={this.props.product !== null ? this.props.product.updatedAt : ""} />
                            </Form.Group>
                            
                        </div>
                    }
                </Form>
            </section>
        )
    }
}

export default MyFormProduct;