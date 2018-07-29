import React, { PureComponent } from 'react';
import PurchaseProduct from './component/PurchaseProduct';
import CartList from './component/CartList';


class App extends PureComponent {
  constructor() {
    super();
    this.state={
        cartProducts:[]
    };
  }

    receivePurchaseProductData = (shoppingProducts) => {
      console.log(shoppingProducts,"qqqqqqqqq")
      this.setState({
          cartProducts:shoppingProducts
      },() => {
          // debugger;
          console.log(this.state.cartProducts,"父组件接收到购物车数据");
      });

    }

  render() {
    return (
       <div className="root">
           <PurchaseProduct receivePurchaseProductData={this.receivePurchaseProductData}/>
           <CartList cartList={this.state.cartProducts} />
       </div>
    );
  }
}

export default App;
