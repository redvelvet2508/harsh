import { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, set, remove } from 'firebase/database'; // Import necessary functions from the Firebase SDK
import "./index.css";
import Login from './Login';

const firebaseConfig = {
  "apiKey": "AIzaSyDYkIrFD5Mfvk4AjCyjP17XCOf_HF9Xc7o",
  "authDomain": "boutique-a3cca.firebaseapp.com",
  "projectId": "boutique-a3cca",
  "storageBucket": "boutique-a3cca.appspot.com",
  "messagingSenderId": "738695344243",
  "appId": "1:738695344243:web:12a56f3a4e830399023a06",
  "measurementId": "G-3HTMPGRP5Z",
  "databaseURL": "https://boutique-a3cca-default-rtdb.firebaseio.com/"
};

const firebaseApp = initializeApp(firebaseConfig);

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productSize, setProductSize] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const database = getDatabase(); // Get a reference to the Realtime Database

  useEffect(() => {
    const dataRef = ref(database, 'products');

    const fetchData = () => {
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProducts(Object.entries(data).map(([id, value]) => ({ id, ...value }))); // Convert object to array of objects with id
        }
      });
    };

    fetchData();

    return () => {
      // Cleanup
    };
  }, [database]);

  const handleLogin = (email, password) => {
    if (email !== '' && password !== '') {
      setIsLoggedIn(true); 
    }
  };

  const uploadProduct = () => {
    const newProductRef = push(ref(database, 'products'));
    set(newProductRef, { name: productName, price: productPrice, size: productSize });
    setProductName("");
    setProductPrice("");
    setProductSize("");
  }

  const deleteProduct = (id) => {
    remove(ref(database, `products/${id}`))
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => {
        console.error("Error removing product: ", error);
      });
  }

  const updateSize = (id, size) => {
    const updatedSize = prompt("Enter the new size:", size) || size;
    set(ref(database, `products/${id}/size`), updatedSize.toUpperCase())
      .catch(error => {
        console.error("Error updating size: ", error);
      });
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <section className="Clothes">
      <div className="newa">
        <h1 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#5a1aa8' }}>Clothes Collection</h1>
        <h2 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#6a0b68' }}>Upload Product</h2>
        <form onSubmit={(e) => { e.preventDefault(); uploadProduct(); }}>
          <label htmlFor="productName">Product Name:</label>
          <input type="text" id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          <label htmlFor="productPrice">Price:</label>
          <input type="number" id="productPrice" name="productPrice" value={productPrice} onChange={(e) => setProductPrice(Number(e.target.value))} required />
          <label htmlFor="productSize">Size:</label>
          <input type="text" id="productSize" name="productSize" value={productSize} onChange={(e) => setProductSize(e.target.value)} required />
          <button type="submit">Upload</button>
        </form>
        <h2 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#6a0b68', marginTop: '20px' }}>Products</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
          <thead>
            <tr style={{ backgroundColor: '#279f25' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Product Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Size</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.price}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.size}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button onClick={() => updateSize(product.id, product.size)}>Update Size</button>
                  <button onClick={() => deleteProduct(product.id)}>Delete Product</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default App;
