import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from '../components/common/Form';
import Alert from '../components/common/Alert';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
const [products, setProducts] = useState([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setError('');
      await login(values.email, values.password);
      // Lấy danh sách sản phẩm sau khi đăng nhập thành công
      const res = await axios.get('/products');
setProducts(res.data.data);
    } catch (err) {
            const msg = err.response?.data?.message;
      if (Array.isArray(msg)) {
        setError(msg.map(e => e.msg).join(' | '));
      } else {
        setError(msg || 'Login failed. Please try again.');
      }
    }
  };

  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true
    }
  ];

  return (
    <div className="login-page">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop">
            <div className="box p-5">
              <h1 className="title is-3 has-text-centered mb-5">Login</h1>
              
              {error && <Alert type="error" message={error} />}
              
              <Form
                fields={fields}
                values={values}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitText="Login"
              />
              <div className="mt-4 has-text-centered">
                <Link to="/products">Xem danh sách sản phẩm</Link>
              </div>
{/* Hiển thị danh sách sản phẩm sau khi đăng nhập thành công */}
              {products.length > 0 && (
                <div className="mt-5">
                  <h2 className="title is-5">Product List</h2>
                  <ul>
                    {products.map(product => (
                      <li key={product._id}>{product.name} - {product.price}đ</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
