import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  tracking?: string;
}

const Orders = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      total: 67000,
      status: 'delivered',
      items: [
        {
          id: '1',
          name: 'Premium Dog Food - Chicken & Rice',
          image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=200',
          price: 15000,
          quantity: 2,
        },
        {
          id: '2',
          name: 'Luxury Pet Bed - Medium Size',
          image: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=200',
          price: 25000,
          quantity: 1,
        },
      ],
      tracking: 'TRK123456789',
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-20',
      total: 48500,
      status: 'shipped',
      items: [
        {
          id: '3',
          name: 'Automatic Pet Feeder - Smart',
          image: 'https://images.unsplash.com/photo-1618680318778-ff1e90961087?w=200',
          price: 45000,
          quantity: 1,
        },
      ],
      tracking: 'TRK987654321',
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-22',
      total: 23500,
      status: 'processing',
      items: [
        {
          id: '4',
          name: 'Pet Grooming Kit - Complete Set',
          image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=200',
          price: 12000,
          quantity: 1,
        },
        {
          id: '5',
          name: 'Dog Treats - Organic',
          image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=200',
          price: 5500,
          quantity: 2,
        },
      ],
    },
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-600" size={20} />;
      case 'processing':
        return <Package className="text-blue-600" size={20} />;
      case 'shipped':
        return <Truck className="text-purple-600" size={20} />;
      case 'delivered':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-600" size={20} />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <h3 className="font-semibold text-green-900">Order Placed Successfully!</h3>
              <p className="text-sm text-green-700">
                Your order has been confirmed. You will receive updates via email and SMS.
              </p>
            </div>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Package className="mx-auto h-24 w-24 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start shopping to place your first order!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">Placed on {formatDate(order.date)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-lg font-bold text-primary-600">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking Info */}
                {order.tracking && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                        <p className="font-mono font-semibold">{order.tracking}</p>
                      </div>
                      <button className="btn-outline text-sm">Track Order</button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="btn-outline flex-1">View Details</button>
                  {order.status === 'delivered' && (
                    <button className="btn-primary flex-1">Leave Review</button>
                  )}
                  {order.status === 'processing' && (
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
