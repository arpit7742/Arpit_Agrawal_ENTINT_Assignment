import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCompanyContext } from '../../context/CompanyContext';

const CompanyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies, addCompany, updateCompany } = useCompanyContext();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: [''],
    phoneNumbers: [''],
    comments: '',
    communicationPeriodicity: 14
  });

  useEffect(() => {
    if (id) {
      const company = companies.find(c => c.id === parseInt(id));
      if (company) {
        setFormData(company);
      }
    }
  }, [id, companies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateCompany(parseInt(id), formData);
    } else {
      addCompany(formData);
    }
    navigate('/admin/companies');
  };

  const handleArrayInput = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const FormField = ({ label, children }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-gray-200 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {id ? 'Edit Company' : 'Add New Company'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Company Name">
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter company name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </FormField>

          <FormField label="Location">
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter company location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </FormField>

          <FormField label="LinkedIn Profile">
            <input
              type="url"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="https://linkedin.com/company/..."
              value={formData.linkedInProfile}
              onChange={(e) => setFormData({ ...formData, linkedInProfile: e.target.value })}
            />
          </FormField>

          <FormField label="Email Addresses">
            <div className="space-y-2">
              {formData.emails.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="email"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="email@company.com"
                    value={email}
                    onChange={(e) => handleArrayInput('emails', index, e.target.value)}
                    required
                  />
                  {formData.emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('emails', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('emails')}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Add Email
              </button>
            </div>
          </FormField>

          <FormField label="Phone Numbers">
            <div className="space-y-2">
              {formData.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="tel"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="+1 (555) 555-5555"
                    value={phone}
                    onChange={(e) => handleArrayInput('phoneNumbers', index, e.target.value)}
                  />
                  {formData.phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('phoneNumbers', index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField('phoneNumbers')}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Add Phone Number
              </button>
            </div>
          </FormField>

          <FormField label="Comments">
            <textarea
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 min-h-[100px] resize-vertical"
              placeholder="Add any additional notes or comments..."
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            />
          </FormField>

          <FormField label="Communication Periodicity (days)">
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={formData.communicationPeriodicity}
              onChange={(e) => setFormData({
                ...formData,
                communicationPeriodicity: parseInt(e.target.value) || 1
              })}
              min="1"
              required
            />
            <div className="mt-2 p-4 bg-blue-50 text-blue-700 rounded-lg">
              Reminder will be sent every {formData.communicationPeriodicity} days
            </div>
          </FormField>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/companies')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              {id ? 'Update' : 'Create'} Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;