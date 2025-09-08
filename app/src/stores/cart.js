import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [
      {
        id: 9,
        title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',
        price: 64,
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
        quantity: 2
      },
      {
        id: 10,
        title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
        price: 109,
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
        quantity: 1
      },
      {
        id: 11,
        title: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
        price: 109,
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
        quantity: 5
      },
      {
        id: 12,
        title: 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
        price: 114,
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
        quantity: 7
      },
      {
        id: 13,
        title: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
        price: 599,
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
        quantity: 1
      },
      {
        id: 14,
        title:
          'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ',
        price: 999.99,
        category: 'electronics',
        image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
        quantity: 1
      }
    ]
  }),
  getters: {
    productCount() {
      return this.products.length
    },
    total() {
      return this.products.reduce((acc, el) => acc + (el.price * el.quantity), 0);
    },
    total_temp() {
      return this.products.reduce((acc, el, i) => {
        console.log('i', i);
        console.log('el', el);
        console.log('acc', acc);
        console.log('===============');
        return acc + (el.price * el.quantity)
      }, 0);
    }
  },
  actions: {
    add(product) {
      this.products.push(product)
    },
    updateProduct(index, quantity) {
      this.products[index].quantity += quantity
    },
    removeProduct(index) {
      this.products.splice(index, 1)
    },
    prepare(product, quantity) {
      let { description, rating, ...newProduct } = product
      newProduct.quantity = quantity

      return newProduct
    }
  }
})
