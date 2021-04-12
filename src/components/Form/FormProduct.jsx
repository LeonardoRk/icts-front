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

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            if(this.props.product !== null) {
                this.setState({
                    preco: this.props.product.preco,
                    descricao: this.props.product.descricao,
                    nome: this.props.product.nome
                })
            }
        }
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

    async submitProduct(e) {
        e.preventDefault();
        const product = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            preco: this.state.preco
        }
        let data = null
        let mode = "";
        if(this.props.mode === "create") {
            mode = "create"
            data = await ProductService.createProduct(product);
        } else if (this.props.mode === "edit") {
            mode = "update"
            data = await ProductService.updateProduct(product, this.props.product.id);
        }
        if(data !== null) {
            this.resetState();
            this.props.close();
            this.props.afterCreate(data, mode)
        }
    }

    resetState() {
        this.setState({nome: "", descricao: "", preco: ""})
    }

    render() {
        return (
            <section>
                <Form onSubmit={ this.submitProduct.bind(this)}>
                    <Form.Group controlId="formBasicNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="text" placeholder="Nome"
                            onChange={this.setNome.bind(this)}
                            value={this.state.nome} />
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="text" placeholder="Descrição"
                            onChange={this.setDescricao.bind(this)}
                            value={this.state.descricao} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control readOnly={this.props.readOnly}
                            type="number" step="0.01" placeholder="Preço"
                            onChange={this.setPreco.bind(this)}
                            value={this.state.preco} />
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