import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className='flex justify-center items-center gap-4'>
      <h1 className='font-bold text-4xl font-sans'>Blog App</h1>
      <img className='w-16 h-16' src='https://w7.pngwing.com/pngs/268/765/png-transparent-medium-logo-medium-blog-blogging-site-brand-logo-social-apps-3d-icon.png' />
    </div>
  )
}

export default Logo