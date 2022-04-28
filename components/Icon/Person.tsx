import React from "react";

function Person() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            // fill={props.fill}
            fill={"transparent"}
            viewBox='0 0 432 484'
        >
            <g transform='translate(-2743 -3297)'>
                <g transform='translate(2743 3538)' stroke-width='60'>
                    <path
                        d='M182.25,0h67.5A182.25,182.25,0,0,1,432,182.25v0A60.75,60.75,0,0,1,371.25,243H60.75A60.75,60.75,0,0,1,0,182.25v0A182.25,182.25,0,0,1,182.25,0Z'
                        stroke='none'
                    />
                    <path
                        d='M177.808,30h76.385A147.808,147.808,0,0,1,402,177.808v0A35.192,35.192,0,0,1,366.808,213H65.192A35.192,35.192,0,0,1,30,177.808v0A147.808,147.808,0,0,1,177.808,30Z'
                        fill='none'
                    />
                </g>
                <g transform='translate(2804 3297)' fill='#fff' stroke='#fff' stroke-width='60'>
                    <circle cx='155' cy='155' r='155' stroke='none' />
                    <circle cx='155' cy='155' r='125' fill='none' />
                </g>
                <g transform='translate(2852 3345)' stroke-width='60'>
                    <circle cx='107' cy='107' r='107' stroke='none' />
                    <circle cx='107' cy='107' r='77' fill='none' />
                </g>
            </g>
        </svg>
    );
}

export default React.memo(Person);
