import React from 'react'
import Lottie from "lottie-react";
import Animation from '../assets/loading.json';

export const LoadingAnimation: React.FC = () => (
    <div className='w-full flex-grow flex items-center justify-center'>
        <div className='w-96 h-96 flex items-center justify-center'>
            <Lottie animationData={Animation} loop autoPlay width={50} height={50}  />
        </div>
    </div>
)

export default LoadingAnimation;