import basket_icon from "./basket_icon.png";
import logo from "./logo.png";
import header_img from "./header_img.png";
import search_icon from "./search_icon.png";
import menu_1 from "./menu_1.png";
import menu_2 from "./menu_2.png";
import menu_3 from "./menu_3.png";
import menu_4 from "./menu_4.png";
import menu_5 from "./menu_5.png";
import menu_6 from "./menu_6.png";
import menu_7 from "./menu_7.png";
import menu_8 from "./menu_8.png";
import menu_9 from "./menu_9.jpg";

import Plus from "./Plus.png";

import food_1 from "./food_1.png";
import food_2 from "./food_2.png";
import food_3 from "./food_3.png";
import food_4 from "./food_4.png";
import food_5 from "./food_5.png";
import food_6 from "./food_6.png";
import food_7 from "./food_7.png";
import food_8 from "./food_8.png";
import food_9 from "./food_9.png";
import food_10 from "./food_10.png";
import food_11 from "./food_11.png";
import food_12 from "./food_12.png";
import food_13 from "./food_13.png";
import food_14 from "./food_14.png";
import food_15 from "./food_15.png";
import food_16 from "./food_16.png";
import food_17 from "./food_17.png";
import food_18 from "./food_18.png";
import food_19 from "./food_19.png";
import food_20 from "./food_20.png";
import food_21 from "./food_21.png";
import food_22 from "./food_22.png";
import food_23 from "./food_23.png";
import food_24 from "./food_24.png";
import food_25 from "./food_25.png";
import food_26 from "./food_26.png";
import food_27 from "./food_27.png";
import food_28 from "./food_28.png";
import food_29 from "./food_29.png";
import food_30 from "./food_30.png";
import food_31 from "./food_31.png";
import food_32 from "./food_32.png";
import food_33 from "./food_33.jpg";
import food_34 from "./food_34.jpg";
import food_35 from "./food_35.jpg";
import food_36 from "./food_36.jpg";
import OptionalPizza from "./OptionalPizza.png";
import OptionalRolls from "./OptionalRolls.png";
import OptionalSalad from "./OptionalSalad.png";
import OptionalSandwich from "./OptionalSandwich.png";

import add_icon_white from "./add_icon_white.png";
import add_icon_green from "./add_icon_green.png";
import remove_icon_red from "./remove_icon_red.png";
import app_store from "./app_store.png";
import play_store from "./play_store.png";
import linkedin_icon from "./linkedin_icon.png";
import facebook_icon from "./facebook_icon.png";
import twitter_icon from "./twitter_icon.png";
import cross_icon from "./cross_icon.png";
import selector_icon from "./selector_icon.png";
import rating_starts from "./rating_starts.png";
import profile_icon from "./profile_icon.png";
import bag_icon from "./bag_icon.png";
import logout_icon from "./logout_icon.png";
import parcel_icon from "./parcel_icon.png";

import Olives from "./Olives.jpg";
import Ham from "./ham.jpg";
import Mushrooms from "./Mushrooms.jpg";
import Onions from "./Onions.jpg";
import Pepperoni from "./Pepperoni.jpg";
import Chicken from "./Chicken.jpg";
import Sausage from "./Sausage.jpg";

import AmericanDrough from "./American.jpg";
import ItalianDrough from "./Italian.jpg";
import ThinCrustDrough from "./Thin crust.jpg";
import StuffedCrustDrough from "./Stuffed crust.jpg";
import NeapolitanStyleDrough from "./Neapolitan style.jpg";

export const SINGLE_SELECT_KEYS = ["dough", "Cooking_Method", "Bread"];
export const MULTI_SELECT_KEYS = [
  "Toppings",
  "Seasonings",
  "Vegetables",
  "Extra_Toppings",
  "Cheese",
  "Filling",
];
export const ALL_OPTION_KEYS = [...SINGLE_SELECT_KEYS, ...MULTI_SELECT_KEYS];
export const OPTION_KEY_LABELS = {
  dough: "Dough",
  Cooking_Method: "Cooking Method",
};
export const Toppings = {
  Olives,
  Ham,
  Mushrooms,
  Onions,
  Pepperoni,
  Chicken,
  Sausage,
};
export const Drough = {
  AmericanDrough,
  ItalianDrough,
  ThinCrustDrough,
  StuffedCrustDrough,
  NeapolitanStyleDrough,
};
export const assets = {
  logo,
  basket_icon,
  header_img,
  search_icon,
  rating_starts,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  app_store,
  play_store,
  linkedin_icon,
  facebook_icon,
  twitter_icon,
  cross_icon,
  selector_icon,
  profile_icon,
  logout_icon,
  bag_icon,
  parcel_icon,
};

export const menu_list = [
  {
    menu_name: "Pizza",
    menu_image: menu_9,
  },
  {
    menu_name: "Salad",
    menu_image: menu_1,
  },
  {
    menu_name: "Rolls",
    menu_image: menu_2,
  },
  {
    menu_name: "Deserts",
    menu_image: menu_3,
  },
  {
    menu_name: "Sandwich",
    menu_image: menu_4,
  },
  {
    menu_name: "Cake",
    menu_image: menu_5,
  },
  {
    menu_name: "Pure Veg",
    menu_image: menu_6,
  },
  {
    menu_name: "Pasta",
    menu_image: menu_7,
  },
  {
    menu_name: "Noodles",
    menu_image: menu_8,
  },
  {
    menu_name: "Optional",
    menu_image: Plus,
  },
];

export const food_list = [
  {
    _id: "33",
    name: "Roast Beaf Pizza",
    image: food_33,
    price: 18,
    description: "American Dough, Tomato Sauce, Mozzarella Cheese, Roast Beef",
    category: "Pizza",
    HaveDetails: false,
  },
  {
    _id: "35",
    name: "Pepperoni Pizza",
    image: food_35,
    price: 28,
    description: "American Dough, Tomato Sauce, Mozzarella Cheese, Pepperoni",
    category: "Pizza",
    HaveDetails: false,
  },
  {
    _id: "36",
    name: "Veg Pizza",
    image: food_36,
    price: 12,
    description:
      "Italian Dough, Tomato Sauce, Mozzarella Cheese, Mixed Vegetables",
    category: "Pizza",
    HaveDetails: false,
  },
  {
    _id: "34",
    name: "Italaino Pizza",
    image: food_34,
    price: 26,
    description:
      "Italian dough, Tomato Sauce, Mozzarella Cheese, Italian Herbs",
    category: "Pizza",
    HaveDetails: false,
  },
  {
    _id: "1",
    name: "Greek salad",
    image: food_1,
    price: 16,
    description: "Asparagus, Egg Yolk, Cucumber, Feta Cheese",
    category: "Salad",
    HaveDetails: false,
  },
  {
    _id: "2",
    name: "Veg salad",
    image: food_2,
    price: 18,
    description: "Lettuce, Tomato, Cucumber, Carrot",
    category: "Salad",
    HaveDetails: false,
  },
  {
    _id: "3",
    name: "Clover Salad",
    image: food_3,
    price: 16,
    description: "Lettuce, Tomato, Cucumber, Clover Leaves",
    category: "Salad",
    HaveDetails: false,
  },
  {
    _id: "4",
    name: "Chicken Salad",
    image: food_4,
    price: 24,
    description: "Lettuce, Tomato, Cucumber, Grilled Chicken",
    category: "Salad",
    HaveDetails: false,
  },
  {
    _id: "5",
    name: "Lasagna Rolls",
    image: food_5,
    price: 14,
    description: "Pasta Sheet, Tomato Sauce, Mozzarella Cheese, Minced Meat",
    category: "Rolls",
    HaveDetails: false,
  },
  {
    _id: "6",
    name: "Peri Peri Rolls",
    image: food_6,
    price: 12,
    description: "Flatbread, Peri Peri Chicken, Lettuce, Peri Peri Sauce",
    category: "Rolls",
    HaveDetails: false,
  },
  {
    _id: "7",
    name: "Chicken Rolls",
    image: food_7,
    price: 20,
    description: "Flatbread, Grilled Chicken, Lettuce, Mayonnaise",
    category: "Rolls",
    HaveDetails: false,
  },
  {
    _id: "8",
    name: "Veg Rolls",
    image: food_8,
    price: 15,
    description: "Flatbread, Mixed Vegetables, Lettuce, Mayonnaise",
    category: "Rolls",
    HaveDetails: false,
  },
  {
    _id: "9",
    name: "Ripple Ice Cream",
    image: food_9,
    price: 14,
    description: "Milk, Cream, Sugar, Chocolate Ripple",
    category: "Deserts",
    HaveDetails: false,
  },
  {
    _id: "10",
    name: "Fruit Ice Cream",
    image: food_10,
    price: 22,
    description: "Milk, Cream, Sugar, Mixed Fruits",
    category: "Deserts",
    HaveDetails: false,
  },
  {
    _id: "11",
    name: "Jar Ice Cream",
    image: food_11,
    price: 10,
    description: "Milk, Cream, Sugar, Chocolate Sauce",
    category: "Deserts",
    HaveDetails: false,
  },
  {
    _id: "12",
    name: "Vanilla Ice Cream",
    image: food_12,
    price: 12,
    description: "Milk, Cream, Sugar, Vanilla Extract",
    category: "Deserts",
    HaveDetails: false,
  },
  {
    _id: "13",
    name: "Chicken Sandwich",
    image: food_13,
    price: 12,
    description: "Bread, Grilled Chicken, Lettuce, Mayonnaise",
    category: "Sandwich",
    HaveDetails: false,
  },
  {
    _id: "14",
    name: "Vegan Sandwich",
    image: food_14,
    price: 18,
    description: "Bread, Lettuce, Tomato, Vegan Spread",
    category: "Sandwich",
    HaveDetails: false,
  },
  {
    _id: "15",
    name: "Grilled Sandwich",
    image: food_15,
    price: 16,
    description: "Bread, Cheese, Tomato, Butter",
    category: "Sandwich",
    HaveDetails: false,
  },
  {
    _id: "16",
    name: "Bread Sandwich",
    image: food_16,
    price: 24,
    description: "Bread, Butter, Cheese",
    category: "Sandwich",
    HaveDetails: false,
  },
  {
    _id: "17",
    name: "Cup Cake",
    image: food_17,
    price: 14,
    description: "Flour, Sugar, Eggs, Butter",
    category: "Cake",
    HaveDetails: false,
  },
  {
    _id: "18",
    name: "Vegan Cake",
    image: food_18,
    price: 12,
    description: "Flour, Sugar, Plant Milk, Vegetable Oil",
    category: "Cake",
    HaveDetails: false,
  },
  {
    _id: "19",
    name: "Butterscotch Cake",
    image: food_19,
    price: 20,
    description: "Flour, Sugar, Eggs, Butter, Butterscotch Flavor",
    category: "Cake",
    HaveDetails: false,
  },
  {
    _id: "20",
    name: "Sliced Cake",
    image: food_20,
    price: 15,
    description: "Flour, Sugar, Eggs, Butter",
    category: "Cake",
    HaveDetails: false,
  },
  {
    _id: "21",
    name: "Garlic Mushroom",
    image: food_21,
    price: 14,
    description: "Mushroom, Garlic, Butter, Herbs",
    category: "Pure Veg",
    HaveDetails: false,
  },
  {
    _id: "22",
    name: "Fried Cauliflower",
    image: food_22,
    price: 22,
    description: "Cauliflower, Flour, Oil, Spices",
    category: "Pure Veg",
    HaveDetails: false,
  },
  {
    _id: "23",
    name: "Mix Veg Pulao",
    image: food_23,
    price: 10,
    description: "Rice, Mixed Vegetables, Oil, Spices",
    category: "Pure Veg",
    HaveDetails: false,
  },
  {
    _id: "24",
    name: "Rice Zucchini",
    image: food_24,
    price: 12,
    description: "Rice, Zucchini, Oil, Spices",
    category: "Pure Veg",
    HaveDetails: false,
  },
  {
    _id: "25",
    name: "Cheese Pasta",
    image: food_25,
    price: 12,
    description: "Pasta, Cheese, Butter, Milk",
    category: "Pasta",
    HaveDetails: false,
  },
  {
    _id: "26",
    name: "Tomato Pasta",
    image: food_26,
    price: 18,
    description: "Pasta, Tomato Sauce, Oil, Spices",
    category: "Pasta",
    HaveDetails: false,
  },
  {
    _id: "27",
    name: "Creamy Pasta",
    image: food_27,
    price: 16,
    description: "Pasta, Cream, Butter, Cheese",
    category: "Pasta",
    HaveDetails: false,
  },
  {
    _id: "28",
    name: "Chicken Pasta",
    image: food_28,
    price: 24,
    description: "Pasta, Chicken, Tomato Sauce, Spices",
    category: "Pasta",
    HaveDetails: false,
  },
  {
    _id: "29",
    name: "Buttter Noodles",
    image: food_29,
    price: 14,
    description: "Noodles, Butter, Salt",
    category: "Noodles",
    HaveDetails: false,
  },
  {
    _id: "30",
    name: "Veg Noodles",
    image: food_30,
    price: 12,
    description: "Noodles, Mixed Vegetables, Oil, Spices",
    category: "Noodles",
    HaveDetails: false,
  },
  {
    _id: "31",
    name: "Somen Noodles",
    image: food_31,
    price: 20,
    description: "Somen, Water, Salt",
    category: "Noodles",
    HaveDetails: false,
  },
  {
    _id: "32",
    name: "Cooked Noodles",
    image: food_32,
    price: 15,
    description: "Noodles, Water, Salt",
    category: "Noodles",
    HaveDetails: false,
  },
  {
    _id: "37",
    name: "Optional Pizza",
    image: OptionalPizza,
    price: 32,
    description: "Custom Pizza with selectable options",
    category: "Optional",
    HaveDetails: true,
    options: {
      dough: [
        { name: "Italian", price: 0, image: Drough.ItalianDrough },
        { name: "American", price: 4, image: Drough.AmericanDrough },
        { name: "Thin crust", price: 6, image: Drough.ThinCrustDrough },
        {
          name: "Neapolitan style",
          price: 7,
          image: Drough.NeapolitanStyleDrough,
        },
        { name: "Stuffed crust", price: 8, image: Drough.StuffedCrustDrough },
      ],
      cheese: [
        { name: "Mozzarella", price: 0, image: food_12 },
        { name: "Cheddar", price: 4, image: food_20 },
        { name: "Vegan", price: 2, image: food_18 },
        { name: "Parmesan", price: 5, image: food_25 },
        { name: "Feta", price: 4, image: food_1 },
        { name: "Gorgonzola", price: 6, image: food_27 },
      ],
      sauce: [
        { name: "Tomato", price: 0, image: food_26 },
        { name: "BBQ", price: 3, image: food_28 },
        { name: "Alfredo Sauce", price: 4, image: food_27 },
        { name: "garlic sauce", price: 2, image: food_21 },
        { name: "Pesto", price: 3, image: food_3 },
      ],
      Toppings: [
        { name: "pepperoni", price: 0, image: Toppings.Pepperoni },
        { name: "chicken", price: 3, image: Toppings.Chicken },
        { name: "sausage", price: 2, image: Toppings.Sausage },
        { name: "ham", price: 3, image: Toppings.Ham },
        { name: "mushrooms", price: 1, image: Toppings.Mushrooms },
        { name: "onions", price: 1, image: Toppings.Onions },
        { name: "olives", price: 1, image: Toppings.Olives },
      ],
      Seasonings: [
        { name: "oregano", price: 0, image: food_2 },
        { name: "basil", price: 2, image: food_3 },
        { name: "garlic", price: 2, image: food_21 },
        { name: "thyme", price: 2, image: food_23 },
        { name: "red pepper flakes", price: 2, image: food_22 },
        { name: "black pepper", price: 2, image: food_24 },
      ],
      Cooking_Method: [
        { name: "wood fired oven", price: 0, image: food_33 },
        { name: "regular oven", price: 0, image: food_34 },
        { name: "pan pizza", price: 0, image: food_36 },
        { name: "grilled pizza", price: 0, image: food_35 },
      ],
    },
  },

  {
    _id: "38",
    name: "Optional Rolls",
    image: OptionalRolls,
    price: 27,
    description: "Custom Rolls with selectable options",
    category: "Optional",
    HaveDetails: true,
    options: {
      Filling: [
        { name: "Chicken", price: 0, image: food_7 },
        { name: "bacon", price: 2, image: food_13 },
        { name: "sausage", price: 2, image: food_6 },
        { name: "shredded lamb", price: 4, image: food_4 },
      ],
      Bread: [
        { name: "Tortilla wraps", price: 0, image: food_8 },
        { name: "Rice paper", price: 1, image: food_5 },
        { name: "Puff pastry", price: 2, image: food_16 },
      ],
      sauce: [
        { name: "Chili sauce", price: 0, image: food_26 },
        { name: "Mustard", price: 1, image: food_20 },
        { name: "Pesto", price: 3, image: food_3 },
      ],
      Seasonings: [
        { name: "Black pepper", price: 0, image: food_24 },
        { name: "paprika", price: 2, image: food_22 },
        { name: "cumin", price: 2, image: food_23 },
        { name: "curry", price: 3, image: food_28 },
        { name: "turmeric", price: 2, image: food_21 },
      ],
    },
  },

  {
    _id: "39",
    name: "Optional Salad",
    image: OptionalSalad,
    price: 25,
    description: "Custom Salad with selectable options",
    category: "Optional",
    HaveDetails: true,
    options: {
      Base: [
        { name: "lettuce", price: 0, image: food_1 },
        { name: "spinach", price: 1, image: food_2 },
        { name: "cabbage", price: 1, image: food_3 },
        { name: "arugula", price: 1, image: food_23 },
        { name: "parsley", price: 1, image: food_21 },
        { name: "red cabbage", price: 1, image: food_22 },
        { name: "basil", price: 1, image: food_24 },
      ],
      Protein: [
        { name: "Grilled chicken", price: 0, image: food_4 },
        { name: "tuna", price: 2, image: food_7 },
        { name: "boiled eggs", price: 1, image: food_9 },
      ],
      Toppings: [
        { name: "Olives", price: 0, image: food_3 },
        { name: "caramelized onions", price: 1, image: food_22 },
        { name: "sun-dried tomatoes", price: 1, image: food_26 },
        { name: "Toasted bread croutons", price: 1, image: food_16 },
      ],
    },
  },

  {
    _id: "40",
    name: "Optional Sandwich",
    image: OptionalSandwich,
    price: 29,
    description: "Custom Sandwitch with selectable options",
    category: "Optional",
    HaveDetails: true,
    options: {
      Bread: [
        { name: "Baguette", price: 0, image: food_16 },
        { name: "Sourdough", price: 1, image: food_15 },
        { name: "Brioche", price: 2, image: food_17 },
        { name: "Ciabatta", price: 1, image: food_14 },
        { name: "Bagel", price: 1, image: food_20 },
      ],
      Main_Filling: [
        { name: "Grilled chicken", price: 0, image: food_7 },
        { name: "Beef", price: 4, image: food_28 },
        { name: "roast beef", price: 4, image: food_33 },
        { name: "steak", price: 5, image: food_4 },
        { name: "veggie patties", price: 2, image: food_23 },
      ],
      Vegetables: [
        { name: "Lettuce", price: 0, image: food_1 },
        { name: "Tomato", price: 1, image: food_26 },
        { name: "Cucumber", price: 1, image: food_2 },
        { name: "Onion", price: 1, image: food_22 },
        { name: "Pickles", price: 1, image: food_3 },
        { name: "Avocado", price: 2, image: food_24 },
        { name: "Coleslaw", price: 1, image: food_23 },
      ],
      Cheese: [
        { name: "Cheddar", price: 0, image: food_20 },
        { name: "Mozzarella", price: 1, image: food_12 },
        { name: "Swiss", price: 1, image: food_25 },
        { name: "Feta", price: 1, image: food_1 },
      ],
      Extra_Toppings: [
        { name: "Bacon", price: 0, image: food_13 },
        { name: "Fried egg", price: 2, image: food_9 },
        { name: "Olives", price: 1, image: Olives },
        { name: "Crispy onions", price: 1, image: food_22 },
        { name: "Jalapeños", price: 1, image: food_6 },
      ],
    },
  },
];
