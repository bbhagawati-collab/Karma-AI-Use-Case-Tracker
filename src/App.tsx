import React, { useState, useEffect, useMemo } from 'react';
import { useCases } from './data';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Clock, LayoutDashboard, CheckCircle2, CircleDashed, Lightbulb, TrendingUp, Users, Filter, X, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';

const STATUS_COLORS = {
  'Live': '#10b981',
  'In Progress': '#f59e0b',
  'Proposed': '#3b82f6'
};

const PRIORITY_COLORS = {
  'High': 'bg-red-50 text-red-700 border-red-200',
  'Medium': 'bg-amber-50 text-amber-700 border-amber-200',
  'Low': 'bg-slate-50 text-slate-700 border-slate-200',
};

const STATUS_BADGE_COLORS = {
  'Live': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'In Progress': 'bg-orange-50 text-orange-700 border-orange-200',
  'Proposed': 'bg-blue-50 text-blue-700 border-blue-200',
};

const ROW_COLORS = {
  'Live': 'bg-emerald-50/30 hover:bg-emerald-50/60',
  'In Progress': 'bg-orange-50/30 hover:bg-orange-50/60',
  'Proposed': 'bg-blue-50/30 hover:bg-blue-50/60',
};

type SortField = 'savings' | 'adoption' | null;

interface FilterState {
  resort: string;
  dept: string;
  priority: string;
  status: string;
  sortBy: SortField;
  sortOrder: 'desc' | 'asc';
}

export default function App() {
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Filters
  const [filterResort, setFilterResort] = useState<string>('All');
  const [filterDept, setFilterDept] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Sorting
  const [sortBy, setSortBy] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Undo State
  const [undoState, setUndoState] = useState<FilterState | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric', 
        hour: 'numeric', minute: '2-digit', hour12: true 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  const resorts = ['All', ...Array.from(new Set(useCases.map(u => u.resort)))].sort();
  const departments = ['All', ...Array.from(new Set(useCases.map(u => u.department)))].sort();
  const priorities = ['All', 'High', 'Medium', 'Low'];

  // Base cases filtered by everything EXCEPT status
  const kpiCases = useMemo(() => {
    return useCases.filter(u => {
      if (filterResort !== 'All' && u.resort !== filterResort) return false;
      if (filterDept !== 'All' && u.department !== filterDept) return false;
      if (filterPriority !== 'All' && u.priority !== filterPriority) return false;
      return true;
    });
  }, [filterResort, filterDept, filterPriority]);

  // Fully filtered & sorted cases
  const filteredCases = useMemo(() => {
    let result = kpiCases.filter(u => {
      if (filterStatus !== 'All' && u.status !== filterStatus) return false;
      return true;
    });

    if (sortBy) {
      result = [...result].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [kpiCases, filterStatus, sortBy, sortOrder]);

  const pieData = useMemo(() => {
    const counts = { 'Proposed': 0, 'In Progress': 0, 'Live': 0 };
    filteredCases.forEach(uc => {
      if (counts[uc.status] !== undefined) {
        counts[uc.status]++;
      }
    });
    return Object.keys(counts)
      .map(key => ({ name: key, value: counts[key as keyof typeof counts] }))
      .filter(d => d.value > 0);
  }, [filteredCases]);

  const totalCasesCount = kpiCases.length;
  const liveCasesCount = kpiCases.filter(c => c.status === 'Live').length;
  const inProgressCasesCount = kpiCases.filter(c => c.status === 'In Progress').length;
  const totalSavings = filteredCases.reduce((sum, c) => sum + c.savings, 0);
  const avgAdoption = filteredCases.length > 0 ? Math.round(filteredCases.reduce((sum, c) => sum + c.adoption, 0) / filteredCases.length) : 0;

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const handleFilterKpiClick = (status: string) => {
    const hasActiveFilters = filterResort !== 'All' || filterDept !== 'All' || filterPriority !== 'All' || (filterStatus !== 'All' && filterStatus !== status);
    
    if (hasActiveFilters) {
      setUndoState({
        resort: filterResort,
        dept: filterDept,
        priority: filterPriority,
        status: filterStatus,
        sortBy,
        sortOrder
      });
      setToastVisible(true);
    } else {
      setToastVisible(false);
    }

    // Apply new filter & clear others for an exclusive view
    setFilterResort('All');
    setFilterDept('All');
    setFilterPriority('All');
    setFilterStatus(status);
  };

  const handleSortKpiClick = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleUndo = () => {
    if (undoState) {
      setFilterResort(undoState.resort);
      setFilterDept(undoState.dept);
      setFilterPriority(undoState.priority);
      setFilterStatus(undoState.status);
      setSortBy(undoState.sortBy);
      setSortOrder(undoState.sortOrder);
      setToastVisible(false);
      setUndoState(null);
    }
  };

  const activeFilters = [
    ...(filterResort !== 'All' ? [{ label: 'Resort', value: filterResort, onRemove: () => setFilterResort('All') }] : []),
    ...(filterDept !== 'All' ? [{ label: 'Department', value: filterDept, onRemove: () => setFilterDept('All') }] : []),
    ...(filterPriority !== 'All' ? [{ label: 'Priority', value: filterPriority, onRemove: () => setFilterPriority('All') }] : []),
    ...(filterStatus !== 'All' ? [{ label: 'Status', value: filterStatus, onRemove: () => setFilterStatus('All') }] : []),
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#c5a059] selection:text-white pb-12 relative overflow-hidden">
      {/* Top Header */}
      <header className="px-8 py-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-semibold tracking-widest text-[#c5a059] uppercase mb-1">Karma Group</h2>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0B192C] tracking-tight">AI Use-Case Tracker</h1>
          <p className="text-slate-500 mt-2 text-base font-light">Track AI initiatives across Karma Resorts.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
          <Clock className="w-3.5 h-3.5" />
          <span>Last Updated: {currentTime}</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        
        {/* KPI Groups */}
        <section className="flex flex-col xl:flex-row gap-6">
          {/* Filtering KPIs Group */}
          <div className="flex-1 bg-slate-50/70 border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300"></div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2 pl-2">
              <Filter className="w-4 h-4" /> Filter by Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-2">
              <KpiCard 
                icon={<LayoutDashboard className="w-4 h-4" />} 
                title="Total AI Projects" 
                value={totalCasesCount.toString()} 
                onClick={() => handleFilterKpiClick('All')}
                isActive={filterStatus === 'All'}
              />
              <KpiCard 
                icon={<CheckCircle2 className={`w-4 h-4 ${filterStatus === 'Live' ? 'text-[#c5a059]' : 'text-emerald-500'}`} />} 
                title="Live Projects" 
                value={liveCasesCount.toString()} 
                onClick={() => handleFilterKpiClick('Live')}
                isActive={filterStatus === 'Live'}
              />
              <KpiCard 
                icon={<CircleDashed className={`w-4 h-4 ${filterStatus === 'In Progress' ? 'text-[#c5a059]' : 'text-orange-500'}`} />} 
                title="In Progress" 
                value={inProgressCasesCount.toString()} 
                onClick={() => handleFilterKpiClick('In Progress')}
                isActive={filterStatus === 'In Progress'}
              />
            </div>
          </div>

          {/* Sorting KPIs Group */}
          <div className="xl:w-[40%] bg-orange-50/40 border border-[#c5a059]/20 rounded-2xl p-5 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a059]/60"></div>
            <h3 className="text-xs font-bold text-[#c5a059] uppercase tracking-widest mb-4 flex items-center gap-2 pl-2">
              <TrendingUp className="w-4 h-4" /> Sort by Metric
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-2">
              <KpiCard 
                icon={<TrendingUp className={`w-4 h-4 ${sortBy === 'savings' ? 'text-[#c5a059]' : 'text-amber-600'}`} />} 
                title="Est. Annual Savings" 
                value={formatCurrency(totalSavings)}
                onClick={() => handleSortKpiClick('savings')}
                isActive={sortBy === 'savings'}
                sortOrder={sortBy === 'savings' ? sortOrder : undefined}
              />
              <KpiCard 
                icon={<Users className={`w-4 h-4 ${sortBy === 'adoption' ? 'text-[#c5a059]' : 'text-blue-500'}`} />} 
                title="Average Adoption" 
                value={`${avgAdoption}%`}
                onClick={() => handleSortKpiClick('adoption')}
                isActive={sortBy === 'adoption'}
                sortOrder={sortBy === 'adoption' ? sortOrder : undefined}
              />
            </div>
          </div>
        </section>

        {/* Filters Top Bar */}
        <section className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 flex flex-col gap-4 z-20 relative">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 pr-4 border-r border-slate-100 hidden md:flex">
              <Filter className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <FilterSelect label="Resort" value={filterResort} onChange={setFilterResort} options={resorts} />
              <FilterSelect label="Department" value={filterDept} onChange={setFilterDept} options={departments} />
              <FilterSelect label="Priority" value={filterPriority} onChange={setFilterPriority} options={priorities} />
            </div>
          </div>
          
          {/* Active Filter Tablets */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4 mt-1 border-t border-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1">Active:</span>
              {activeFilters.map(filter => (
                <span key={`${filter.label}-${filter.value}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 shadow-sm transition-all">
                  <span className="text-[#c5a059]/70">{filter.label}:</span> 
                  <span className="font-bold">{filter.value}</span>
                  <button onClick={filter.onRemove} className="hover:bg-[#c5a059]/20 text-[#c5a059] rounded-full p-0.5 ml-0.5 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button 
                onClick={() => {
                  setFilterResort('All');
                  setFilterDept('All');
                  setFilterPriority('All');
                  setFilterStatus('All');
                  setSortBy(null);
                }} 
                className="text-xs font-medium text-slate-400 hover:text-slate-600 underline ml-2 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </section>

        {/* Chart & Table */}
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
          
          {/* Chart */}
          <div className="xl:col-span-1 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 sticky top-6">
            <h3 className="text-base font-serif font-semibold text-[#0B192C] mb-6 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#c5a059]" />
              Status Breakdown
            </h3>
            <div className="h-56 w-full">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="45%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                      itemStyle={{ color: '#0B192C', fontWeight: 500 }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle"
                      formatter={(value) => <span className="text-xs text-slate-600 font-medium">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm">No data available</div>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="xl:col-span-3 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-base font-serif font-semibold text-[#0B192C]">Initiative Portfolio</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-500 shadow-sm">
                {filteredCases.length} Results
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">AI Use Case</th>
                    <th className="px-6 py-4 font-semibold">Resort</th>
                    <th className="px-6 py-4 font-semibold">Department</th>
                    <th className="px-6 py-4 font-semibold">Owner</th>
                    <th className="px-6 py-4 font-semibold text-center">Priority</th>
                    <th className="px-6 py-4 font-semibold text-center">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">ROI Est.</th>
                    <th className="px-6 py-4 font-semibold text-right">Savings/Yr</th>
                    <th className="px-6 py-4 font-semibold text-right">Adoption</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredCases.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-16 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                          <Filter className="w-8 h-8 text-slate-200" />
                          <p>No initiatives match the selected filters.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCases.map((uc) => (
                      <tr key={uc.id} className={`${ROW_COLORS[uc.status as keyof typeof ROW_COLORS]} transition-colors duration-150`}>
                        <td className="px-6 py-4 font-medium text-[#0B192C]">{uc.name}</td>
                        <td className="px-6 py-4 text-slate-500 text-xs">{uc.resort}</td>
                        <td className="px-6 py-4 text-slate-500 text-xs">{uc.department}</td>
                        <td className="px-6 py-4 text-slate-600 text-xs">{uc.owner}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${PRIORITY_COLORS[uc.priority]}`}>
                            {uc.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${STATUS_BADGE_COLORS[uc.status]}`}>
                            {uc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-600 font-medium text-xs">{uc.roiEstimate}</td>
                        <td className="px-6 py-4 text-right text-emerald-600 font-medium text-xs">{formatCurrency(uc.savings)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#c5a059] rounded-full" 
                                style={{ width: `${uc.adoption}%` }} 
                              />
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono w-6">{uc.adoption}%</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>

      {/* Undo Toast */}
      <div 
        className={`fixed bottom-6 right-6 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-6 z-50 transition-all duration-500 transform ${toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-[#c5a059]">
            <Filter className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Filters overridden</span>
            <span className="text-xs text-slate-400">Applied KPI selection</span>
          </div>
        </div>
        <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
          <button 
            onClick={handleUndo}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-[#c5a059] hover:text-white text-slate-300 rounded-xl text-sm font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Undo
          </button>
          <button onClick={() => setToastVisible(false)} className="text-slate-500 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, onClick, isActive, sortOrder }: { title: string, value: string, icon: React.ReactNode, onClick?: () => void, isActive?: boolean, sortOrder?: 'asc' | 'desc' }) {
  return (
    <div 
      onClick={onClick}
      className={`group bg-white border rounded-xl p-4 shadow-sm transition-all duration-300 flex items-center gap-4 ${onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : 'cursor-default'} ${isActive ? 'border-[#c5a059] ring-2 ring-[#c5a059]/20 shadow-md bg-[#c5a059]/5' : 'border-slate-100 hover:border-slate-200'}`}
    >
      <div className={`p-2.5 rounded-lg transition-colors duration-300 flex-shrink-0 ${isActive ? 'bg-[#c5a059] text-white shadow-sm' : 'bg-slate-50 text-slate-400 group-hover:bg-[#c5a059]/10 group-hover:text-[#c5a059]'}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`text-[11px] font-bold tracking-wide uppercase mb-0.5 truncate ${isActive ? 'text-[#c5a059]' : 'text-slate-400'}`}>
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-xl font-serif font-bold text-[#0B192C] leading-none truncate">{value}</p>
          {isActive && sortOrder && (
            <span className="text-[#c5a059] bg-[#c5a059]/10 p-0.5 rounded flex-shrink-0">
              {sortOrder === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: string[] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap sm:w-24 sm:text-right">{label}</label>
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-50/50 hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg pl-3 pr-8 py-2.5 outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all cursor-pointer shadow-sm"
        >
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
}
