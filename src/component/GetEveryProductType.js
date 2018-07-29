import React from 'react';
import PREFERENTIAL_PRODUCT_LIST from '../data/promotionProduct';

function GetEveryProductType(props) {
  let itemBarcode = props.barcode;
  let promotionProductList = PREFERENTIAL_PRODUCT_LIST;

  let selecedtItemIndex = promotionProductList[0].barcodes.indexOf(itemBarcode);

  if (selecedtItemIndex != -1) {
    return '买二赠一';
  } else {
    return '无';
  }
}

export default GetEveryProductType;
