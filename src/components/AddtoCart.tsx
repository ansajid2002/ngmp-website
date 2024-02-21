import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import BagIcon from './BagIcon';

const AddToCartButton = () => {
    const [isAdded, setAdded] = useState(false);
    const [isAnimating, setAnimating] = useState(false);
    const controls = useAnimation();

    const handleClick = () => {
        if (!isAnimating) {
            setAdded(true);
            setAnimating(true);

            controls.start({
                x: window.innerWidth , // Adjust the value as needed
                y: -window.innerHeight,
                opacity: 0,
                transition: { duration: 2, ease: 'easeInOut' },
            });
        }
    };

    return (
        <motion.div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <motion.button
                onClick={handleClick}
                style={{
                    background: isAdded ? '#4caf50' : '#2196f3',
                    color: 'white',
                    padding: '12px 24px',
                    fontSize: '18px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    outline: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={controls}
                onAnimationComplete={() => setAnimating(false)}
                disabled={isAnimating}
            >
                {isAdded ? (
                    <>
                        <BagIcon className='text-white mr-2' />
                        <span>Added to Cart!</span>
                    </>
                ) : (
                    <>
                        <span>Add to Cart</span>
                        <BagIcon className='text-white ml-2' />
                    </>
                )}
            </motion.button>

            {isAdded && (
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        opacity: isAnimating ? 1 : 0,
                    }}
                >
                    <BagIcon className='text-sm mr-2' />
                    <motion.span style={{ fontSize: '18px', color: '#4caf50', fontWeight: 'bold' }}>1</motion.span>
                </motion.div>
            )}
        </motion.div>
    );
};

export default AddToCartButton;
