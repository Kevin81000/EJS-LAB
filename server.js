const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const restaurant = {
  name: 'The Green Byte Bistro',
  isOpen: true,
  address: '742 Evergreen Rd, Mapleview, OS 45502',
  phone: '555-321-9876',
  menu: [
    {
      id: 1,
      name: 'Quantum Quinoa Mushroom Burger',
      price: 13.00,
      rating: 4,
      category: 'mains',
      details: 'A vegetarian burger made with a quinoa and mushroom patty, it will take you to another realm.'
    },
    {
      id: 2,
      name: 'Binary Berry Cheesecake',
      price: 10.11,
      rating: 3,
      category: 'desserts',
      details: 'A creamy cheesecake bursting with flavor. A mix of berries in every byte.'
    },
    {
      id: 3,
      name: 'Recursive Rigatoni',
      price: 17.00,
      rating: 5,
      category: 'mains',
      details: 'A classic rigatoni pasta dish, layered with rich tomato sauce and herbs. You\'ll keep coming back for more.'
    },
    {
      id: 4,
      name: 'Pumpkin Pi Squared',
      price: 3.14,
      rating: 5,
      category: 'desserts',
      details: 'A delightful pumpkin dessert, squared and spiced to perfection.'
    },
    {
      id: 5,
      name: 'Fibonacci String Bean Fries',
      price: 11.23,
      rating: 5,
      category: 'sides',
      details: 'Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.'
    }
  ]
};

app.get('/', (req, res) => {
  console.log('Rendering home, restaurant:', restaurant);
  res.render('home', { restaurant });
});
app.get('/menu', (req, res) => {
  console.log('Rendering menu, restaurant:', restaurant);
  res.render('menu', { restaurant }, { cache: false });
});
app.get('/menu/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  console.log('Category:', category);
  const validCategories = ['mains', 'desserts', 'sides'];
  if (!validCategories.includes(category)) {
    console.log('Invalid category, rendering error');
    return res.status(404).render('error', { message: `Category "${category}" not found.` });
  }
  const menuItems = restaurant.menu.filter(item => item.category.toLowerCase() === category);
  console.log('MenuItems:', menuItems);
  res.render('category', { menuItems, category, restaurant }, { cache: false });
});

app.use((req, res) => {
  console.log('Rendering 404, path:', req.path);
  res.status(404).render('error', { message: 'Page not found.', restaurant }, { cache: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});