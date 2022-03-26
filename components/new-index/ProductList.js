import React from "react";
import ProductItem from '@/components/new-index/ProductItem'
export default function ProductList({}) {

    return (
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-x-14 gap-y-10">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
        </section>
    )
}