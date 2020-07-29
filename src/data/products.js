const produtcs = [
  {
    id: 1,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/Macbook-Pro-2020.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '-',
    tenant: 'Jhon Doe',
    status: 'Menunggu',
    statusColor: 'outline-menunggu',
    description: '',
    stock: 62,
    total: 100
  },
  {
    id: 2,
    code: 'A0002',
    title: 'Asus A550',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Asus',
    year: '2020',
    createDate: '02-05-2020',
    verificationDate: '10-04-2020',
    tenant: 'Jane Doe',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Cheesecake with chocolate cookies and Cream biscuits',
    sales: 1240,
    stock: 48
  },
  {
    id: 3,
    code: 'A0003',
    title: 'Lenovo ThinkPad',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Lenovo',
    year: '2020',
    createDate: '04-04-2020',
    verificationDate: '13-04-2020',
    tenant: 'Sarah Kotnie',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Homemade cheesecake with fresh berries and mint',
    sales: 1080,
    stock: 57
  },
  {
    id: 4,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Eliza Pill',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Chocolate cake with berries',
    sales: 1014,
    stock: 41
  },
  {
    id: 5,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Tolak',
    statusColor: 'outline-tolak',
    description: 'Chocolate cake with mascarpone',
    sales: 985,
    stock: 23
  },
  {
    id: 6,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Wedding cake decorated with donuts and wild berries',
    sales: 962,
    stock: 34
  },
  {
    id: 7,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Cheesecake with fresh berries and mint for dessert',
    sales: 921,
    stock: 31
  },
  {
    id: 8,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Tolak',
    statusColor: 'outline-tolak',
    description: 'Delicious vegan chocolate cake',
    sales: 887,
    stock: 21
  },
  {
    id: 9,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description:
      'White chocolate strawberry yogurt cake decorated with fresh fruits and chocolate',
    sales: 865,
    stock: 53
  },
  {
    id: 10,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Christmas fruit cake, pudding on top',
    sales: 824,
    stock: 55
  },
  {
    id: 11,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Selesai',
    statusColor: 'outline-tolak',
    description: 'Wedding cake decorated with donuts and wild berries',
    sales: 714,
    stock: 12
  },
  {
    id: 12,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Christmas fruit cake, pudding on top',
    sales: 702,
    stock: 14
  },
  {
    id: 13,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Tolak',
    statusColor: 'outline-tolak',
    description:
      'White chocolate strawberry yogurt cake decorated with fresh fruits and chocolate',
    sales: 689,
    stock: 78
  },
  {
    id: 14,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Delicious vegan chocolate cake',
    sales: 645,
    stock: 55
  },
  {
    id: 15,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Tolak',
    statusColor: 'outline-tolak',
    description: 'Cheesecake with fresh berries and mint for dessert',
    sales: 632,
    stock: 20
  },
  {
    id: 16,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Menunggu',
    statusColor: 'outline-menunggu',
    description: 'Chocolate cake with mascarpone',
    sales: 621,
    stock: 6
  },
  {
    id: 17,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Chocolate cake with berries',
    sales: 595,
    stock: 17
  },
  {
    id: 18,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Selesai',
    statusColor: 'outline-selesai',
    description: 'Homemade cheesecake with fresh berries and mint',
    sales: 574,
    stock: 16
  },
  {
    id: 19,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Tolak',
    statusColor: 'outline-tolak',
    description: 'Cheesecake with chocolate cookies and Cream biscuits',
    sales: 562,
    stock: 9
  },
  {
    id: 20,
    code: 'A0001',
    title: 'Macbook Pro',
    img: '/assets/img/marble-cake-thumb.jpg',
    category: 'Laptop',
    merk: 'Apple',
    year: '2020',
    createDate: '02-04-2020',
    verificationDate: '20-04-2020',
    tenant: 'Jhon Doe',
    status: 'Tolak',
    statusColor: 'outline-tolak',
    description: 'Wedding cake with flowers Macarons and blueberries',
    sales: 524,
    stock: 14
  }
]

export default produtcs

export const dataProducts = [
    {
      id: 1,
      code: 'A0001',
      title: 'Macbook Pro',
      img: '/assets/img/Macbook-Pro-2020.jpg',
      category: 'Laptop',
      merk: 'Apple',
      year: '2020',
      createDate: '02-04-2020',
      verificationDate: '-',
      tenant: 'Jhon Doe',
      status: 'Menunggu',
      statusColor: 'outline-menunggu',
      description: '',
      stock: 62,
      total: 100
    },
]
