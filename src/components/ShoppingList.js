import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then((resp) => resp.json())
    .then((data => setItems(data)))
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function deleteItem(id){
    const updatedItems = items.filter((item) => item.id !== id)
    console.log(updatedItems)
    setItems(updatedItems)
    fetch(`http://localhost:4000/items/${id}`, {
      method: 'DELETE'
    })
  }

  function handleUpdateItem(item){
    const updatedItems = items.map((i) => {
      if(i.id === item.id) {
        return item
      } else {
        return i
      }
    })
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm setItems={setItems} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item handleUpdateItem={handleUpdateItem} deleteItem={deleteItem} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
