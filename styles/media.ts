const sizes = {
    giant: 1440,
    bigDesktop: 1200,
    desktop: 1000,
    tablet: 768,
    thone: 600,
    phablet: 480,

    phone: 360,
    tiny: 320,
};

interface MeidaProp {
    giant: any;
    bigDesktop: any;
    desktop: any;
    tablet: any;
    thone: any;
    phablet: any;
    phone: any;
    tiny: any;
}

export const media: MeidaProp = Object.keys(sizes).reduce((accumulator, label) => {
    const emSize = sizes[label] / 16;
    accumulator[label] = `
    @media (max-width: ${emSize}em) 
  `;
    return accumulator;
}, {}) as MeidaProp;

export default media;
