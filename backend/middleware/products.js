const products = [
    {
        name: 'JEE Mentorship + Study Material',
        price: 1999,
        code: 7988
    },
    {
        name: 'JEE Study Material',
        price: 499,
        code: 8930
    },
]
const details = [
    {
        ...products[0],
        img: 'https://api.rankboost.live/images/ms.png',
        description: 'new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it',

    },
    {
        ...products[1],
        img: 'https://api.rankboost.live/images/sm.png',
        description: 'new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it',

    },
]

module.exports = { products, details }