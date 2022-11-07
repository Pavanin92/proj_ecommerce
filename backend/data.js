import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Gabriel',
      email: 'admin@exemplo.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Hugo',
      email: 'user@exemplo.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: '1',
      name: 'Produto 01',
      slug: 'produto-01',
      category: 'categoria01',
      image: '/images/p1.jpg',
      price: 11.25,
      countInStock: 10,
      brand: 'Marca01',
      rating: 4.5,
      numReviews: 10,
      description: 'produto de alta qualidade',
    },
    {
      //_id: '2',
      name: 'Produto 02',
      slug: 'produto-02',
      category: 'categoria02',
      image: '/images/p2.jpg',
      price: 10.55,
      countInStock: 0,
      brand: 'Marca01',
      rating: 3.0,
      numReviews: 2,
      description: 'produto de alta qualidade',
    },
    {
      //_id: '3',
      name: 'Produto 03',
      slug: 'produto-03',
      category: 'categoria03',
      image: '/images/p3.jpg',
      price: 13.2,
      countInStock: 5,
      brand: 'Marca01',
      rating: 4.0,
      numReviews: 12,
      description: 'produto de alta qualidade',
    },
    {
      //_id: '4',
      name: 'Produto 04',
      slug: 'produto-04',
      category: 'categoria04',
      image: '/images/p4.jpg',
      price: 12.25,
      countInStock: 10,
      brand: 'Marca01',
      rating: 3.5,
      numReviews: 3,
      description: 'produto de alta qualidade',
    },
  ],
};

export default data;
