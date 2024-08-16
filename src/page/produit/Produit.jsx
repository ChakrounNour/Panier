import React from 'react'
import { data } from './../../helpers/produit';
import ProduitItem from './ProduitItem';

function Produit() {
  return (
    <div>
      <h1>list produit</h1>
       <ProduitItem  produit={data} />
    </div>
  )
}

export default Produit
