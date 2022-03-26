import React , { useState } from "react";
import dynamic from 'next/dynamic'

const AspiringItem = dynamic(() => import('./AspiringItem'), { ssr: false })

export default function Aspiring({}) {
    return (
        <section className="mt-36 pt-3 pb-10">
            <h4 className="text-4xl font-bold  text-title-1 mb-10">Aspiring Designers</h4>
            <section className="mt-10 grid lg:grid-cols-4 grid-cols-1 gap-10">
                <AspiringItem />
                <AspiringItem />
                <AspiringItem />
                <AspiringItem />
            </section>
        </section>
    )
}