import React, { PureComponent } from 'react';
import ListPageHeader from '../component/ListPageHeader';
import '../style/productListItem.css';

class CartList extends PureComponent {
  constructor() {
    super();
    this.state = {
      cartList: []
    };
  }

  componentDidMount() {
    this.setState(
      {
        cartList: this.props.cartList
      },
      () => {
        console.log(this.state.cartList, 'cartList data');
      }
    );
  }

  // getEveryProductType = productItemBarcode => {
  //     const ItemObj = this.state.promotionProductList[0]['barcodes'].find(
  //         itemBarcode => {
  //             return itemBarcode === productItemBarcode;
  //         }
  //     );
  //     return ItemObj ? '买二赠一' : '无';
  // };

  // shouldComponentUpdate(){
  //
  // }

  render() {
    return (
      <div className="CartListRoot">
        <div>购物列表</div>
        <ListPageHeader />
          <ul className="item-content clearfix">
              {this.state.cartList.map(productItem => {
                  return (
                      <div key={productItem.barcode}>
                          <li className="td td-name">{productItem.name}</li>
                          <li className="td td-unit">{productItem.unit}</li>
                          <li className="td td-price">{productItem.price}</li>
                          <li className="td td-type">类型</li>
                          <div className="addToCartPro">
                              <li className="td td-amount">{productItem.count}</li>
                          </div>
                      </div>
                  );
              })}
          </ul>

        <div>确定购买</div>
        <div>计算总价</div>
      </div>
    );
  }
}

export default CartList;
