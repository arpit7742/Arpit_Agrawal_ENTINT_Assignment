import React, { useState, useMemo } from 'react';
import { useCompanyContext } from '../../context/CompanyContext';
import { format } from 'date-fns';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, AreaChart, Area
} from 'recharts';

const CommunicationReports = () => {
  const { companies, communicationMethods } = useCompanyContext();
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [dateRange, setDateRange] = useState({ start: null, end: null });

 
  const frequencyData = useMemo(() => {
    const communications = companies
      .flatMap(company => company.communications || [])
      .filter(comm => 
        (selectedCompany === 'all' || comm.companyId === selectedCompany) &&
        (!dateRange.start || new Date(comm.date) >= dateRange.start) &&
        (!dateRange.end || new Date(comm.date) <= dateRange.end)
      );

    return communicationMethods.map(method => ({
      method: method.name,
      count: communications.filter(c => c.method === method.name).length
    }));
  }, [companies, selectedCompany, dateRange]);


  const effectivenessData = useMemo(() => {
    const communications = companies
      .flatMap(company => company.communications || [])
      .filter(comm => comm.response);

    return communicationMethods.map(method => ({
      method: method.name,
      responseRate: (communications.filter(c => 
        c.method === method.name && c.response === 'successful'
      ).length / communications.filter(c => c.method === method.name).length * 100) || 0
    }));
  }, [companies, communicationMethods]);

  const overdueData = useMemo(() => {
    const dates = {};
    companies.forEach(company => {
      const communications = company.communications || [];
      communications.forEach(comm => {
        const date = format(new Date(comm.date), 'yyyy-MM-dd');
        if (!dates[date]) dates[date] = { date, overdue: 0 };
        if (comm.status === 'overdue') dates[date].overdue++;
      });
    });
    return Object.values(dates).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [companies]);

  const exportReport = (exportFormat) => {
    const data = {
      frequency: frequencyData,
      effectiveness: effectivenessData,
      overdue: overdueData
    };

    if (exportFormat === 'csv') {
      const csvContent = `data:text/csv;charset=utf-8,${Object.entries(data)
        .map(([key, values]) => 
          values.map(v => Object.values(v).join(',')).join('\n')
        ).join('\n\n')}`;
      const link = document.createElement('a');
      link.href = encodeURI(csvContent);
      link.download = `communication_report_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 mb-6">
        <select
          value={selectedCompany}
          onChange={e => setSelectedCompany(e.target.value)}
          className="w-48 px-3 py-2 border rounded-md"
        >
          <option value="all">All Companies</option>
          {companies.map(company => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <button 
          onClick={() => exportReport('csv')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Communication Frequency</h2>
        <BarChart width={700} height={300} data={frequencyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="method" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Engagement Effectiveness</h2>
        <BarChart width={700} height={300} data={effectivenessData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="method" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="responseRate" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Overdue Communication Trends</h2>
        <AreaChart width={700} height={300} data={overdueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="overdue" fill="#fca5a5" stroke="#ef4444" />
        </AreaChart>
      </div>

      <ActivityLog />
    </div>
  );
};

const ActivityLog = () => {
  const { companies } = useCompanyContext();
  const [sortKey, setSortKey] = useState('date');
  
  const activities = useMemo(() => {
    return companies
      .flatMap(company => 
        (company.communications || []).map(comm => ({
          ...comm,
          companyName: company.name
        }))
      )
      .sort((a, b) => new Date(b[sortKey]) - new Date(a[sortKey]));
  }, [companies, sortKey]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left cursor-pointer" 
                  onClick={() => setSortKey('date')}>
                Date
              </th>
              <th className="p-2 text-left">Company</th>
              <th className="p-2 text-left">Method</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{format(new Date(activity.date), 'PP')}</td>
                <td className="p-2">{activity.companyName}</td>
                <td className="p-2">{activity.method}</td>
                <td className="p-2">{activity.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunicationReports;