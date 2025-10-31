import React from 'react';

const Loader = () => {
    return (
            <div className="flex items-center justify-center h-[calc(90vh-20px)]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>   
    );
};

export default Loader;