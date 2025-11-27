import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'income',
    image: null,
    imagePreview: null
  })

  // Load transactions from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions')
    if (savedTransactions) {
      const parsed = JSON.parse(savedTransactions)
      setTransactions(parsed)
      calculateBalance(parsed)
    }
  }, [])

  // Calculate balance from transactions
  const calculateBalance = (transactionsList) => {
    const total = transactionsList.reduce((sum, transaction) => {
      return transaction.type === 'income' 
        ? sum + parseFloat(transaction.amount)
        : sum - parseFloat(transaction.amount)
    }, 0)
    setBalance(total)
  }

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.description || !formData.amount) {
      alert('Please fill in all required fields')
      return
    }

    const newTransaction = {
      id: Date.now(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      date: new Date().toISOString(),
      image: formData.imagePreview
    }

    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    calculateBalance(updatedTransactions)
    
    // Save to localStorage
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))

    // Reset form
    setFormData({
      description: '',
      amount: '',
      type: 'income',
      image: null,
      imagePreview: null
    })
  }

  // Delete transaction
  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter(t => t.id !== id)
    setTransactions(updatedTransactions)
    calculateBalance(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
  }

  // Remove image from form
  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
      imagePreview: null
    })
  }

  return (
    <div className="w-full">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-white text-5xl font-bold mb-6 drop-shadow-lg">
          💰 Money Manager
        </h1>
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-auto">
          <h2 className="text-gray-600 text-xl mb-3 font-medium">Current Balance</h2>
          <p className={`text-5xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Form Section */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-gray-800 text-3xl font-bold mb-6">Add Transaction</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type Select */}
            <div className="flex flex-col gap-2">
              <label htmlFor="type" className="text-gray-700 font-semibold text-sm">
                Type
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Description Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-gray-700 font-semibold text-sm">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
                required
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all placeholder-gray-400"
              />
            </div>

            {/* Amount Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="text-gray-700 font-semibold text-sm">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all placeholder-gray-400"
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="text-gray-700 font-semibold text-sm">
                Upload Image (Optional)
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {formData.imagePreview && (
                <div className="relative inline-block mt-3">
                  <img 
                    src={formData.imagePreview} 
                    alt="Preview" 
                    className="max-w-[200px] max-h-[200px] rounded-lg border-2 border-gray-200 object-cover"
                  />
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-primary-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Add Transaction
            </button>
          </form>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-gray-800 text-3xl font-bold mb-6">Transactions</h2>
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg">
              No transactions yet. Add your first transaction above!
            </p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className={`border-2 rounded-xl p-5 transition-all hover:shadow-lg hover:-translate-y-1 ${
                    transaction.type === 'income' 
                      ? 'border-l-4 border-l-green-500 border-gray-200' 
                      : 'border-l-4 border-l-red-500 border-gray-200'
                  }`}
                >
                  {/* Transaction Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-gray-800 text-xl font-semibold mb-1">
                        {transaction.description}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className={`text-2xl font-bold ${
                        transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Transaction Image */}
                  {transaction.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={transaction.image} 
                        alt={transaction.description}
                        className="w-full max-h-[300px] object-cover"
                      />
                    </div>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
