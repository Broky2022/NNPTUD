import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import Form from '../components/common/Form';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', quantity: '', category: '' });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/products');
      setProducts(res.data.data);
      setError('');
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    try {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    } catch {
      setError('Xóa sản phẩm thất bại');
    }
  };

  const handleEdit = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category?._id || ''
    });
  };

  const handleFormChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      if (editing) {
        await axios.put(`/products/${editing}`, form);
      } else {
        await axios.post('/products', form);
      }
      setEditing(null);
      setForm({ name: '', price: '', quantity: '', category: '' });
      fetchProducts();
    } catch {
      setError('Lưu sản phẩm thất bại');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="title is-3">Danh sách sản phẩm</h1>
      {error && <Alert type="error" message={error} />}
      <Form
        fields={[
          { name: 'name', label: 'Tên sản phẩm', type: 'text', required: true },
          { name: 'price', label: 'Giá', type: 'number', required: true },
          { name: 'quantity', label: 'Số lượng', type: 'number', required: true },
          { name: 'category', label: 'ID Danh mục', type: 'text', required: true },
        ]}
        values={form}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        submitText={editing ? 'Cập nhật' : 'Thêm mới'}
      />
      <table className="table is-fullwidth mt-5">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="5">Đang tải...</td></tr>
          ) : products.length === 0 ? (
            <tr><td colSpan="5">Không có sản phẩm</td></tr>
          ) : (
            products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category?.name || product.category}</td>
                <td>
                  <Button onClick={() => handleEdit(product)} size="small">Sửa</Button>
                  <Button onClick={() => handleDelete(product._id)} size="small" color="danger">Xóa</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
