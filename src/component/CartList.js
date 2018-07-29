import React, { PureComponent } from 'react';
import ListPageHeader from '../component/ListPageHeader';

class CartList extends PureComponent {
    constructor(){
        super();
        this.state = {
            cartList:[]
        }
    }

    componentDidMount(){
        this.setState({
            cartList:this.props.cartList
        },() => {
            console.log(this.state.cartList,'cartList data');
        });
    }

    render() {
        return (
            <div className="CartListRoot">
                <ListPageHeader />
                <div>haha</div>
                {
                    this.state.cartList.map(productItem => {
                    return (<div key={productItem.barcode}>
                            <li className="td td-name">{productItem.name}</li>
                            <li className="td td-unit">{productItem.unit}</li>
                            <li className="td td-price">{productItem.price}</li>
                            <li className="td td-type">
                                {this.getEveryProductType(productItem.barcode)}
                            </li>
                            <div className="addToCartPro">
                                <li className="td td-amount">
                                    <input
                                        type="number"
                                        name="number"
                                        onChange={e => {
                                            this.changeGoodCount(e);
                                        }}
                                    />
                                </li>
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default CartList;
