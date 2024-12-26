export const getStatusColor = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100'
      case 'due':
        return 'bg-yellow-100'
      case 'upcoming':
        return 'bg-pink-50'
      default:
        return 'bg-gray-50'
    }
  }
  
  export const getTextColor = (status) => {
    switch (status) {
      case 'overdue':
        return 'text-red-600'
      case 'due':
        return 'text-yellow-600'
      case 'upcoming':
        return 'text-pink-600'
      default:
        return 'text-gray-600'
    }
  }