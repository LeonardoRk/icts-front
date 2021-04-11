import { Component } from 'react';
import './options.css'

class Options extends Component {

    render() {
        return(
            <center>
                <button 
                    className="edit-button">EDITAR
                </button>
                <button 
                    onClick={() => this.props.setYesNo(this.props.index)} 
                    className="delete-button">EXCLUIR
                </button>
            </center>
        );
    }
}

export default Options;