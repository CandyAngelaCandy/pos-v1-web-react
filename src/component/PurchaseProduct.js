import React, { PureComponent } from 'react';
import PRODUCT_LIST from '../data/productListData';
import PREFERENTIAL_PRODUCT_LIST from '../data/promotionProduct';
import ListPageHeader from '../component/ListPageHeader';
import GetEveryProductType from '../component/GetEveryProductType';
import '../style/productListItem.css';
import '../style/siteNavBanner.css';
import { Link } from 'react-router-dom';

class PurchaseProduct extends PureComponent {
  constructor() {
    super();
    this.state = {
      productList: PRODUCT_LIST,
      promotionProductList: PREFERENTIAL_PRODUCT_LIST,
      shoppingProducts: [],
      currentProductList: []
    };
  }

  addProductInCart = productItem => {
    const { shoppingProducts } = this.state;
    const { currentProductList } = this.state;

    const currentItem = currentProductList.find(currentItemList => {
      return currentItemList.barcode === productItem.barcode;
    });

    if (currentItem) {
      const purchaseItem = shoppingProducts.find(goodItem => {
        return goodItem.barcode === productItem.barcode;
      });

      if (purchaseItem) {
        purchaseItem.count = currentItem.count;
      } else {
        shoppingProducts.push(currentItem);
      }

      this.setState({
        shoppingProducts: [...shoppingProducts]
      });
    }
  };

  changeGoodCount = (e, productItem) => {
    const { currentProductList } = this.state;

    const purchaseItem = currentProductList.find(goodItem => {
      return goodItem.barcode === productItem.barcode;
    });

    if (purchaseItem) {
      purchaseItem.count = e.target.value;
    } else {
      currentProductList.push({
        ...productItem,
        count: e.target.value
      });
    }

    this.setState({ currentProductList: [...currentProductList] });
  };

  transformDataToApp = () => {
    console.log(this.state.shoppingProducts, '文件夹甲方收到款');
    this.props.receivePurchaseProductData(this.state.shoppingProducts);
  };

  render() {
    return (
      <div className="PurchaseProductRoot">
        <div className="site-nav-bd">
          <ul className="site-nav-bd-list">
            <li className="site-nav-system-title">购物系统</li>
            <li className="site-nav-my-cart">
              <Link to="/cartList">
                <div onClick={this.transformDataToApp}>我的购物车</div>
              </Link>
            </li>
          </ul>
        </div>
        <ListPageHeader />

        {this.state.productList.map(productItem => {
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
                  <li className="td td-amount">
                    <input
                      type="number"
                      name="number"
                      onChange={e => {
                        this.changeGoodCount(e, productItem);
                      }}
                    />
                  </li>
                  <li className="td td-op">
                    <a
                      onClick={() => {
                        this.addProductInCart(productItem);
                      }}
                    >
                      购买
                    </a>
                  </li>
                </div>
              </div>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default PurchaseProduct;
