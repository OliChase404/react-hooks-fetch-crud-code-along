import React, { useState } from "react";

function ItemForm({setItems}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function addNewItem(event){
    event.preventDefault()
    const newItem = {
      name: name,
      category: category,
      isInCart: false,
    }
    setItems((prevItems) => {
      return [...prevItems, newItem]
    })
    fetch('http://localhost:4000/items',{
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'accept' : 'application/json',
      },
      body: JSON.stringify(newItem)
    })
  }


  return (
    <form onSubmit={(event) => addNewItem(event)} className="NewItem">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
