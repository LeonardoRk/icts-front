import { Component } from 'react'
import './tableBody.css';
import Options  from '../Options'

class TableBody extends Component {

    constructor(props) {
        super(props)
    }

    setYesNo(index) {
        this.props.setYesNoVisible(index);
    }

    render() {
        return (
            <tbody>
                {this.props.items.map((item, index) => (
                    <tr key={index} >
                        <td>{item.id}</td>
                        <td className="hover" 
                            close={this.props.close}
                            onClick={() => {this.props.openCompleteModal("view", index)}}>
                            {this.props.type === "product" ? item.nome : item.total}
                        </td>
                        <td>
                            <Options index={index} openCompleteModal={this.props.openCompleteModal}
                             setYesNo={this.setYesNo.bind(this)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;