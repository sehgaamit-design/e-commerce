import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/popular/Popular'
import Offers from '../components/Offers/Offers'
import Newcollection from '../components/New-collections/Newcollection'

const Shophome = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <Newcollection />
    </div>
  )
}

export default Shophome