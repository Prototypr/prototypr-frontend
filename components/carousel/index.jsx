import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './EmblaCarousel'
import Header from './Header'
import Footer from './Footer'
// import '../css/base.css'
// import '../css/sandbox.css'
// import '../css/embla.css'

const OPTIONS = { align: 'start' }
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Carousel = ({gallery}) => (
    <section className="sandbox__carousel">
      <EmblaCarousel slides={gallery} options={OPTIONS} />
    </section>
)


export default Carousel