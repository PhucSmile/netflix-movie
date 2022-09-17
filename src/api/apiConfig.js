const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '74668e6a4e240f0cb28b93fb4c889a5b',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
