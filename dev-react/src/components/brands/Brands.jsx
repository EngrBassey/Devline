import React from 'react';
import './brands.css'

const brandList = [
    require('../../asserts/slack.png'),
    require('../../asserts/atlassian.png'),
    require('../../asserts/shopify.png'),
    require('../../asserts/dropbox.png'),
    require('../../asserts/google.png'),
]

const Brands = () => {
  return (
    <div className='brand-component'>
      {brandList.map((items) => (
        <img src={items} alt="company-logo" />
      ))

      }
    </div>
  )
}

export default Brands
