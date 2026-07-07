import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/popular/Popular'
import Offers from '../components/Offers/Offers'
import Newcollection from '../components/New-collections/Newcollection'
import Newsletter from '../components/Newsletter/Newsletter'

const Shophome = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <Newcollection />
      <Newsletter />
    </div>
  )
}

export default Shophome