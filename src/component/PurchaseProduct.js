import React, { PureComponent } from 'react';
import PRODUCT_LIST from '../data/productListData';
import PREFERENTIAL_PRODUCT_LIST from '../data/promotionProduct';
import ListPageHeader from '../component/ListPageHeader';
import '../style/productListItem.css';
import '../style/siteNavBanner.css';

class PurchaseProduct extends PureComponent {
  constructor() {
    super();
    this.state = {
      productList: PRODUCT_LIST,
      promotionProductList: PREFERENTIAL_PRODUCT_LIST,
      shoppingProducts: [],
      inputGoodCount: 0
    };
  }

  getEveryProductType = productItemBarcode => {
    const ItemObj = this.state.promotionProductList[0]['barcodes'].find(
      itemBarcode => {
        return itemBarcode === productItemBarcode;
      }
    );
    return ItemObj ? '买二赠一' : '无';
  };

  addProductInCart = productItem => {
    const { shoppingProducts } = this.state;

    const purchaseItem = shoppingProducts.find(goodItem => {
      return goodItem.barcode === productItem.barcode;
    });

    if (purchaseItem) {
      purchaseItem.count = this.state.inputGoodCount;
    } else {
      shoppingProducts.push({
        ...productItem,
        count: this.state.inputGoodCount
      });
    }

    //debugger;

    this.setState({
      shoppingProducts: [...shoppingProducts]
    });
  };

  changeGoodCount = e => {
    this.setState({
      inputGoodCount: e.target.value
    });
  };

  transformDataToApp = () => {
      console.log(this.state.shoppingProducts,'文件夹甲方收到款')
    this.props.receivePurchaseProductData(this.state.shoppingProducts);
  };

  render() {
    return (
      <div className="PurchaseProductRoot">
        <div className="site-nav-bd">
          <ul className="site-nav-bd-list">
            <li className="site-nav-system-title">购物系统</li>
            <li className="site-nav-my-cart">
              <a href="javascript:void(0);" onClick={this.transformDataToApp}>
                我的购物车
              </a>
            </li>
          </ul>
        </div>
        <ListPageHeader />
        <ul className="item-content clearfix">
          {this.state.productList.map(productItem => {
            return (
              <div key={productItem.barcode}>
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
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PurchaseProduct;
