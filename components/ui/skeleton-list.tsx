import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonList() {
  return (
    <div className='w-full'> 
        <Skeleton height={62} count={8} /> 
    </div>
  )
}

export default SkeletonList