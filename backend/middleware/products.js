const products = [
    {
        name: 'CBT',
        price: 1499,
        code: 8572
    },
    {
        name: 'Test Series',
        price: 1999,
        code: 1462
    },
    {
        name: 'JEE Mentorship',
        price: 1999,
        code: 7988
    },
    {
        name: 'JEE Study Material',
        price: 999,
        code: 8930
    },
]
const details = [
    {
        ...products[0],
        img: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg',
        description: 'new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it',

    },
    {
        ...products[1],
        img: 'https://cdn.pixabay.com/photo/2023/03/28/19/54/mountains-7884039_640.jpg',
        description: 'new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it',

    },
    {
        ...products[2],
        img: 'https://cdn.pixabay.com/photo/2023/03/26/11/40/terraces-7878191_1280.jpg',
        description: 'new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it',

    },
    {
        ...products[3],
        img: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg',
        description: 'new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it new way to interact and create new opputunites and go away with the fact of using it',

    }
]

module.exports = { products, details }