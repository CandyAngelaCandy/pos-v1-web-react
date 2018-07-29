/**
 * Created by 22935 on 2018/3/13.
 */
import React, { PureComponent } from 'react';
import '../style/listPageHeader.css';

class ListPageHeader extends PureComponent {
  render() {
    return (
      <div className="component-listPageHeader">
        <div className="product-table-th">
          <ul className="wp">
            <li className="th th-name">名称</li>
            <li className="th th-unit">单位</li>
            <li className="th th-price">单价</li>
            <li className="th th-type">类型</li>
            <li className="th th-amount">数量</li>
            <li className="th th-op">操作</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ListPageHeader;
