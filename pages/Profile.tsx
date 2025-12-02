import React, { useState, useEffect } from 'react';
import { User, Clock, MapPin, Mail, LogOut, Heart, Settings, Save, X, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout, updateProfile, isAuthenticated, transactions } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', location: '' });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user) {
      setEditForm({ username: user.username, location: user.location });
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-serif text-slate-800 mb-10 pl-2 drop-shadow-sm">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Sidebar Info */}
          <div className="col-span-1">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-white p-8 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-24 bg-terracotta-50/50 z-0"></div>
               <div className="relative z-10">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-terracotta-500 shadow-sm border-4 border-white">
                    <User size={40} />
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-3 mb-4">
                      <input 
                        className="w-full text-center font-bold text-slate-800 border-b border-terracotta-300 focus:outline-none bg-transparent"
                        value={editForm.username}
                        onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                      />
                      <input 
                        className="w-full text-center text-sm text-slate-500 border-b border-terracotta-300 focus:outline-none bg-transparent"
                        value={editForm.location}
                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                        placeholder="Location"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-slate-800">{user.username}</h2>
                      <div className="flex items-center justify-center gap-2 text-slate-500 mt-2 text-sm">
                        <MapPin size={14} /> {user.location}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-slate-400 mt-1 text-xs">
                        <Mail size={12} /> {user.email}
                      </div>
                    </>
                  )}
                  
                  <div className="mt-8 space-y-3">
                     {isEditing ? (
                       <div className="flex gap-2">
                         <button onClick={handleSave} className="flex-1 py-2.5 bg-sage-600 text-white rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 hover:bg-sage-700">
                            <Save size={16} /> Save
                         </button>
                         <button onClick={() => setIsEditing(false)} className="py-2.5 px-3 bg-sand-100 text-slate-600 rounded-xl text-sm font-medium transition hover:bg-sand-200">
                            <X size={16} />
                         </button>
                       </div>
                     ) : (
                       <button onClick={() => setIsEditing(true)} className="w-full py-2.5 px-4 border border-sand-300 rounded-xl text-slate-600 hover:bg-sand-50 text-sm font-medium transition flex items-center justify-center gap-2">
                          <Settings size={16} /> Edit Profile
                       </button>
                     )}
                     
                     <button onClick={handleSignOut} className="w-full py-2.5 px-4 text-terracotta-600 hover:bg-terracotta-50 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2">
                        <LogOut size={16} /> Sign Out
                     </button>
                  </div>
               </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            
            {/* Wallet / Impact */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-white p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-center sm:text-left">
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Total Contribution</p>
                <p className="text-3xl font-serif text-slate-800">${user.balance.toFixed(2)}</p>
              </div>
              <div className="h-px w-full sm:w-px sm:h-12 bg-sand-200"></div>
               <div className="text-center sm:text-left">
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Conversations</p>
                <p className="text-3xl font-serif text-slate-800">
                  {transactions.filter(t => t.type !== 'Donation').length}
                </p>
              </div>
              <div className="w-full sm:w-auto">
                 <button onClick={() => navigate('/donate')} className="w-full sm:w-auto bg-terracotta-500 hover:bg-terracotta-600 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-terracotta-100">
                    <Heart size={16} /> Donate
                 </button>
              </div>
            </div>

            {/* History Table */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-white overflow-hidden">
               <div className="px-8 py-6 border-b border-sand-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 text-lg">Transaction History</h3>
               </div>
               <div className="overflow-x-auto">
                 {transactions.length > 0 ? (
                   <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-sand-50/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                         <tr>
                            <th className="px-8 py-4">Date</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Method</th>
                            <th className="px-6 py-4">Amount</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-sand-100">
                        {transactions.map(item => (
                          <tr key={item.id} className="hover:bg-sand-50/50 transition">
                             <td className="px-8 py-4 font-medium text-slate-800">{item.date}</td>
                             <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                  item.type === 'Donation' ? 'bg-sage-100 text-sage-700' : 'bg-terracotta-100 text-terracotta-700'
                                }`}>
                                  {item.type}
                                </span>
                             </td>
                             <td className="px-6 py-4">{item.description}</td>
                             <td className="px-6 py-4 text-slate-400">{item.method}</td>
                             <td className="px-6 py-4 font-medium">${item.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                 ) : (
                   <div className="p-8 text-center text-slate-400 flex flex-col items-center">
                      <ShoppingBag size={32} className="mb-2 opacity-50"/>
                      <p>No history yet.</p>
                      <button onClick={() => navigate('/communicate?mode=chat')} className="mt-4 text-terracotta-600 font-semibold text-sm hover:underline">
                        Start your first chat
                      </button>
                   </div>
                 )}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;