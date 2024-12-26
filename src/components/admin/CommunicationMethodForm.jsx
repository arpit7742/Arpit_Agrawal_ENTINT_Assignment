import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCompanyContext } from '../../context/CompanyContext';

const CommunicationMethodForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { communicationMethods, addCommunicationMethod, updateCommunicationMethod } = useCompanyContext();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sequence: 1,
    isMandatory: false
  });

  useEffect(() => {
    if (id) {
      const method = communicationMethods.find(m => m.id === parseInt(id));
      if (method) {
        setFormData(method);
      }
    } else {
      // Set the next sequence number for new methods
      const maxSequence = Math.max(...communicationMethods.map(m => m.sequence), 0);
      setFormData(prev => ({
        ...prev,
        sequence: maxSequence + 1
      }));
    }
  }, [id, communicationMethods]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate sequence number is unique
    const existingMethod = communicationMethods.find(
      m => m.sequence === formData.sequence && m.id !== parseInt(id)
    );

    if (existingMethod) {
      alert('A method with this sequence number already exists. Please choose a different sequence.');
      return;
    }

    if (id) {
      updateCommunicationMethod(parseInt(id), formData);
    } else {
      addCommunicationMethod({
        ...formData,
        id: Date.now()
      });
    }
    navigate('/admin/communication-methods');
  };

  const handleMoveSequence = (direction) => {
    const newSequence = direction === 'up' 
      ? Math.max(1, formData.sequence - 1)
      : formData.sequence + 1;
    
    setFormData(prev => ({
      ...prev,
      sequence: newSequence
    }));
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? 'Edit Communication Method' : 'Add New Communication Method'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Method Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="e.g., LinkedIn Post, Email, Phone Call"
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            placeholder="Describe when and how this communication method should be used"
          />
        </div>

        <div>
          <label className="block mb-2">Sequence Order</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-24 border p-2 rounded"
              value={formData.sequence}
              onChange={(e) => setFormData({ ...formData, sequence: parseInt(e.target.value) })}
              min="1"
              required
            />
            <button
              type="button"
              onClick={() => handleMoveSequence('up')}
              className="px-3 py-2 border rounded hover:bg-gray-50"
              disabled={formData.sequence <= 1}
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => handleMoveSequence('down')}
              className="px-3 py-2 border rounded hover:bg-gray-50"
            >
              ↓
            </button>
            <span className="text-sm text-gray-500">
              Determines the order in communication sequence
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isMandatory"
            checked={formData.isMandatory}
            onChange={(e) => setFormData({ ...formData, isMandatory: e.target.checked })}
            className="rounded"
          />
          <label htmlFor="isMandatory">
            Mandatory in communication sequence
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/admin/communication-methods')}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-pink-500 text-white rounded"
          >
            {id ? 'Update' : 'Create'} Method
          </button>
        </div>
      </form>

      {id && (
        <div className="mt-8 p-4 bg-yellow-50 rounded">
          <h2 className="font-semibold mb-2">Warning</h2>
          <p className="text-sm text-yellow-800">
            Changing the sequence order may affect existing communication schedules. 
            Make sure to review and update any affected companies after making changes.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunicationMethodForm;