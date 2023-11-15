import React, { ReactNode, CSSProperties } from 'react';

interface HeadingProps {

    title: string;
    style?: CSSProperties;

}

const Heading: React.FC<HeadingProps> = ({
    title,
    style,

}) => {
    return (
        <div className="text-center mb-10">
            <h1 className="mb-6 text-[36px] tracking-wide font-semibold relative inline-block px-4 pb-2">
                {title}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-orange-500 to-blue-20 rounded-full"></div>
            </h1>
        </div>
    );
};

export default Heading;
