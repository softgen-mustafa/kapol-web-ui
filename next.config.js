// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.1.13',  // The IP address or domain of your image source
                port: '45001',             // The port where your backend is serving the images
                pathname: '/imageservice/image/**',  // Path pattern for the image service
            },
        ],
    },
};
