import React, { PureComponent } from 'react';
import GetEveryProductType from './GetEveryProductType';
import '../style/productListItem.css';
import '../style/siteNavBanner.css';
import PREFERENTIAL_PRODUCT_LIST from '../data/promotionProduct';

class CartList extends PureComponent {
  constructor() {
    super();
    this.state = {
      cartList: [],
      cartDataToBackEnd: [],
      productsSum: 0
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

  passCartDataToBackEnd = () => {
    console.log(this.state.cartList);

    //debugger;
    const { cartDataToBackEnd } = this.state;

    this.state.cartList.map(itemList => {
      cartDataToBackEnd.push(`${itemList.barcode}-${itemList.count}`);
    });

    this.setState(
      {
        cartDataToBackEnd: [...cartDataToBackEnd]
      },
      () => {
        console.log('后端数据', this.state.cartDataToBackEnd);
      }
    );
  };

  getEveryProductType = itemBarcode => {
    let promotionProductList = PREFERENTIAL_PRODUCT_LIST;

    let selecedtItemIndex = promotionProductList[0].barcodes.indexOf(
      itemBarcode
    );

    if (selecedtItemIndex != -1) {
      return '买二赠一';
    } else {
      return '无';
    }
  };

  calculateProductsSum = () => {
    let { productsSum } = this.state;

    //debugger;

    this.state.cartList.map(item => {
      let itemCount = parseInt(item.count, 10);

      if (this.getEveryProductType(item.barcode) === '买二赠一') {
        itemCount = itemCount >= 2 ? --itemCount : itemCount;
      }

      productsSum += item.price * itemCount;
    });

    this.setState({
      productsSum: productsSum
    });
  };

  render() {
    return (
      <div className="CartListRoot">
        <div className="site-nav-bd">
          <ul className="site-nav-bd-list">
            <li className="site-nav-system-title">购物列表</li>
          </ul>
        </div>
        <div className="component-listPageHeader">
          <div className="product-table-th">
            <ul className="wp">
              <li className="th th-name">名称</li>
              <li className="th th-unit">单位</li>
              <li className="th th-price">单价</li>
              <li className="th th-type">类型</li>
              <li className="th th-amount">数量</li>
            </ul>
          </div>
        </div>
        {this.state.cartList.map(productItem => {
          return (
            <ul className="item-content clearfix" key={productItem.barcode}>
              <div>
                <li className="td td-name">{productItem.name}</li>
                <li className="td td-unit">{productItem.unit}</li>
                <li className="td td-price">{productItem.price}</li>
                <li className="td td-type">
                  <GetEveryProductType barcode={productItem.barcode} />
                </li>
                <div className="addToCartPro">
                  <li className="td td-amount">{productItem.count}</li>
                </div>
              </div>
            </ul>
          );
        })}
        <div className="purchase-button">
          <button className="cart-button" onClick={this.passCartDataToBackEnd}>
            确定购买
          </button>
          <button className="cart-button" onClick={this.calculateProductsSum}>
            计算总价
          </button>
          <div className="product-sum">总价：{this.state.productsSum}元</div>
        </div>
      </div>
    );
  }
}

export default CartList;
