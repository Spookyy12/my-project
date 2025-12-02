import { User, UserRole, Transaction } from '../types';

const DB_KEY_USERS = 'oeao_db_users';
const DB_KEY_TXS = 'oeao_db_transactions';

// Initialize DB if empty
const initDB = () => {
  if (!localStorage.getItem(DB_KEY_USERS)) {
    const initialUsers: User[] = [
      {
        id: 'u_admin',
        username: 'Admin',
        email: 'admin@example.com',
        location: 'Florida',
        role: UserRole.ADMIN,
        balance: 100
      }
    ];
    localStorage.setItem(DB_KEY_USERS, JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem(DB_KEY_TXS)) {
    localStorage.setItem(DB_KEY_TXS, JSON.stringify([]));
  }
};

export const mockDB = {
  getUsers: (): User[] => {
    initDB();
    const data = localStorage.getItem(DB_KEY_USERS);
    return data ? JSON.parse(data) : [];
  },

  findUserByEmail: (email: string): User | undefined => {
    const users = mockDB.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  createUser: (user: User): User => {
    const users = mockDB.getUsers();
    // Check for duplicates
    if (users.some(u => u.email === user.email)) {
      throw new Error("Email already registered");
    }
    users.push(user);
    localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
    return user;
  },

  updateUser: (updatedUser: User) => {
    const users = mockDB.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
    }
  },

  // Transaction Methods
  getTransactions: (userId: string): Transaction[] => {
    initDB();
    const data = localStorage.getItem(DB_KEY_TXS);
    const allTxs: Transaction[] = data ? JSON.parse(data) : [];
    return allTxs.filter(tx => tx.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  addTransaction: (tx: Transaction) => {
    initDB();
    const data = localStorage.getItem(DB_KEY_TXS);
    const allTxs: Transaction[] = data ? JSON.parse(data) : [];
    allTxs.push(tx);
    localStorage.setItem(DB_KEY_TXS, JSON.stringify(allTxs));
    
    // Update user balance/total contribution
    const users = mockDB.getUsers();
    const userIndex = users.findIndex(u => u.id === tx.userId);
    if (userIndex !== -1) {
      users[userIndex].balance += tx.amount;
      localStorage.setItem(DB_KEY_USERS, JSON.stringify(users));
    }
  }
};