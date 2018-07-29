import React, { PureComponent } from 'react';
import PurchaseProduct from './component/PurchaseProduct';
import CartList from './component/CartList';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

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
          cartProducts:[...shoppingProducts]
      },() => {
          // debugger;
          console.log(this.state.cartProducts,"父组件接收到购物车数据");
      });

    }

  render() {
      return (
          <Router>
              <div>
                  <Route exact path="/" component={() => <PurchaseProduct receivePurchaseProductData={this.receivePurchaseProductData} />} />
                  <Route path="/cartList" component={() => <CartList cartList={this.state.cartProducts}/>} />
              </div>
          </Router>
      );
  }

}

export default App;
