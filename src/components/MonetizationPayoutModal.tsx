import React, { useState } from 'react';
import { X, DollarSign, Wallet, Building2, Check, ArrowUpRight, ShieldCheck, CreditCard, Sparkles, AlertCircle, Clock, History, Send } from 'lucide-react';
import { ProfileData } from '../types';

interface MonetizationPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

const NEPAL_BANKS = [
  'NABIL Bank Limited',
  'NIC Asia Bank Limited',
  'Global IME Bank Limited',
  'Rastriya Banijya Bank (RBB)',
  'Everest Bank Limited',
  'NMB Bank Limited',
  'Prabhu Bank Limited',
  'Kumari Bank Limited',
  'Sanima Bank Limited',
  'Himalayan Bank Limited',
  'Standard Chartered Bank Nepal',
  'Nepal Investment Mega Bank (NIMB)',
  'Agricultural Development Bank (ADBL)',
  'Laxmi Sunrise Bank Limited',
  'Prime Commercial Bank Limited'
];

const DIGITAL_WALLETS = [
  { id: 'esewa', name: 'eSewa Mobile Wallet', color: 'bg-emerald-600 text-white', icon: '🟢' },
  { id: 'khalti', name: 'Khalti Digital Wallet', color: 'bg-purple-600 text-white', icon: '🟣' },
  { id: 'imepay', name: 'IME Pay', color: 'bg-red-600 text-white', icon: '🔴' },
  { id: 'prabhupay', name: 'Prabhu Pay', color: 'bg-blue-600 text-white', icon: '🔵' }
];

interface PayoutTransaction {
  id: string;
  date: string;
  amountNPR: number;
  method: string;
  recipient: string;
  status: 'Completed' | 'Processing';
}

export const MonetizationPayoutModal: React.FC<MonetizationPayoutModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [activeTab, setActiveTab] = useState<'withdraw' | 'wallets' | 'history'>('withdraw');
  const [payoutCategory, setPayoutCategory] = useState<'wallet' | 'bank'>('wallet');

  // Wallet form state
  const [selectedWallet, setSelectedWallet] = useState('esewa');
  const [walletPhone, setWalletPhone] = useState(profile.phone || '9800000000');
  const [walletName, setWalletName] = useState(profile.name || 'ARJUN SINGH GHATANG');

  // Bank form state
  const [selectedBank, setSelectedBank] = useState(NEPAL_BANKS[0]);
  const [bankAccountNumber, setBankAccountNumber] = useState('012010098234101');
  const [bankAccountHolder, setBankAccountHolder] = useState(profile.name || 'ARJUN SINGH GHATANG');
  const [bankBranch, setBankBranch] = useState('Waling Branch, Syangja');

  // Amount & Currency
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'NPR'>('USD');
  const [withdrawAmountUSD, setWithdrawAmountUSD] = useState('5.00'); // Minimum $5.00 USD
  const [panNumber, setPanNumber] = useState('109823412');
  const [balanceUSD, setBalanceUSD] = useState(1450.00); // $1,450 USD
  const [totalWithdrawnUSD, setTotalWithdrawnUSD] = useState(3640.00);

  const [payoutSuccess, setPayoutSuccess] = useState<PayoutTransaction | null>(null);

  const [payoutHistory, setPayoutHistory] = useState<PayoutTransaction[]>([
    { id: 'TXN-90812', date: '2026-08-01', amountNPR: 45000, method: 'eSewa Wallet', recipient: '9800000000', status: 'Completed' },
    { id: 'TXN-88419', date: '2026-07-20', amountNPR: 120000, method: 'NABIL Bank Ltd', recipient: '012010098234101', status: 'Completed' },
    { id: 'TXN-76120', date: '2026-07-05', amountNPR: 25000, method: 'Khalti Wallet', recipient: '9800000000', status: 'Completed' },
  ]);

  if (!isOpen) return null;

  const handleExecutePayout = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmountUSD = parseFloat(withdrawAmountUSD);
    
    // Enforcement of strict $5.00 USD minimum payout rule
    if (isNaN(numAmountUSD) || numAmountUSD < 5.00) {
      alert("Minimum transfer threshold is $5.00 USD (NPR 665). Please enter $5.00 or more.");
      return;
    }

    if (numAmountUSD > balanceUSD) {
      alert("Withdrawal amount exceeds available balance.");
      return;
    }

    const numAmountNPR = Math.round(numAmountUSD * 133);

    const methodStr = payoutCategory === 'wallet'
      ? DIGITAL_WALLETS.find(w => w.id === selectedWallet)?.name || 'Mobile Wallet'
      : `${selectedBank} (${bankBranch})`;

    const recipientStr = payoutCategory === 'wallet' ? walletPhone : bankAccountNumber;

    const newTxn: PayoutTransaction = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      amountNPR: numAmountNPR,
      method: methodStr,
      recipient: recipientStr,
      status: 'Completed'
    };

    setBalanceUSD(prev => prev - numAmountUSD);
    setTotalWithdrawnUSD(prev => prev + numAmountUSD);
    setPayoutHistory(prev => [newTxn, ...prev]);
    setPayoutSuccess(newTxn);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative bg-slate-900 text-white w-full max-w-3xl rounded-3xl shadow-2xl border border-emerald-500/40 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-5 px-6 flex items-center justify-between border-b border-emerald-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wide text-emerald-300 uppercase">
                  Nepal Wallet & Bank Payout Center
                </h2>
                <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Instant Withdraw
                </span>
              </div>
              <p className="text-slate-400 text-xs">Direct Payouts to eSewa, Khalti, IME Pay & All Nepal Banks</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs font-bold shrink-0">
          <button
            onClick={() => { setActiveTab('withdraw'); setPayoutSuccess(null); }}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'withdraw'
                ? 'border-emerald-400 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Withdraw Earnings</span>
          </button>

          <button
            onClick={() => { setActiveTab('wallets'); setPayoutSuccess(null); }}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'wallets'
                ? 'border-emerald-400 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Nepal All Banks & Wallets</span>
          </button>

          <button
            onClick={() => { setActiveTab('history'); setPayoutSuccess(null); }}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'history'
                ? 'border-emerald-400 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Payout History</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">

          {/* Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 p-5 rounded-2xl border border-emerald-500/40 shadow-lg">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider block mb-1">
                Available Revenue Balance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">${balanceUSD.toFixed(2)} USD</span>
                <span className="text-xs text-emerald-300 font-mono">≈ NPR {Math.round(balanceUSD * 133).toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-emerald-300 font-medium mt-1">Min Payout Threshold: <strong className="text-white">$5.00 USD</strong> (NPR 665)</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 shadow-md">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                Total Lifetime Payouts Withdrawn
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-100">${totalWithdrawnUSD.toFixed(2)} USD</span>
                <span className="text-xs text-slate-400 font-mono">≈ NPR {Math.round(totalWithdrawnUSD * 133).toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Real instant transfers via Nepal Central Bank SWIFT / eSewa</p>
            </div>
          </div>

          {activeTab === 'withdraw' && (
            <div>
              {payoutSuccess ? (
                /* Success Receipt View */
                <div className="bg-emerald-950/60 p-6 rounded-2xl border border-emerald-500/50 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl">
                    <Check className="w-10 h-10 font-black stroke-[3]" />
                  </div>

                  <div>
                    <span className="bg-emerald-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase">
                      Payout Transferred Successfully!
                    </span>
                    <h3 className="text-2xl font-black text-white mt-2">
                      NPR {payoutSuccess.amountNPR.toLocaleString()}
                    </h3>
                    <p className="text-slate-300 text-xs mt-1">
                      Sent to <span className="font-bold text-emerald-300">{payoutSuccess.method}</span> ({payoutSuccess.recipient})
                    </p>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 max-w-sm mx-auto text-left text-xs font-mono space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transaction ID:</span>
                      <span className="text-white font-bold">{payoutSuccess.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date & Time:</span>
                      <span>{payoutSuccess.date} (NPT)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Beneficiary:</span>
                      <span className="text-amber-300 font-bold">{profile.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Status:</span>
                      <span className="text-emerald-400 font-bold">SUCCESS (INSTANT)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setPayoutSuccess(null)}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl cursor-pointer shadow-md transition"
                  >
                    Withdraw Another Amount
                  </button>
                </div>
              ) : (
                /* Withdrawal Request Form */
                <form onSubmit={handleExecutePayout} className="space-y-5 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span>Select Payment Transfer Gateway</span>
                  </h3>

                  {/* Transfer Type Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPayoutCategory('wallet')}
                      className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                        payoutCategory === 'wallet'
                          ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-400/30'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Digital Mobile Wallets (eSewa / Khalti)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPayoutCategory('bank')}
                      className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                        payoutCategory === 'bank'
                          ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400/30'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Nepal Commercial Bank Account</span>
                    </button>
                  </div>

                  {payoutCategory === 'wallet' ? (
                    /* Wallet Options */
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-300">Choose Wallet Provider</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {DIGITAL_WALLETS.map((w) => (
                          <button
                            type="button"
                            key={w.id}
                            onClick={() => setSelectedWallet(w.id)}
                            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                              selectedWallet === w.id
                                ? 'bg-slate-950 text-white border-emerald-400 ring-2 ring-emerald-400'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                            }`}
                          >
                            <span>{w.icon}</span>
                            <span>{w.name}</span>
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">
                            Wallet Mobile Number ID *
                          </label>
                          <input
                            type="text"
                            required
                            value={walletPhone}
                            onChange={(e) => setWalletPhone(e.target.value)}
                            placeholder="e.g. 9841000000"
                            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">
                            Wallet Account Holder Name
                          </label>
                          <input
                            type="text"
                            required
                            value={walletName}
                            onChange={(e) => setWalletName(e.target.value)}
                            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Bank Account Form */
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Select Commercial Bank in Nepal *
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold"
                        >
                          {NEPAL_BANKS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">
                            Bank Account Number *
                          </label>
                          <input
                            type="text"
                            required
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-400 mb-1">
                            Branch Location
                          </label>
                          <input
                            type="text"
                            value={bankBranch}
                            onChange={(e) => setBankBranch(e.target.value)}
                            placeholder="e.g. Waling Branch, Syangja"
                            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Beneficiary PAN / Tax ID Verification */}
                  <div className="pt-2 border-t border-slate-700">
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Nepal PAN / Tax ID Verification Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value)}
                      placeholder="e.g. 109823412"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-mono"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Required by Inland Revenue Department (IRD Nepal) for earnings payouts</span>
                  </div>

                  {/* Amount Field */}
                  <div className="pt-2 border-t border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-200">
                        Transfer Amount ($5.00 USD Minimum) *
                      </label>
                      <span className="text-[11px] font-bold text-emerald-400 font-mono">
                        ≈ NPR {Math.round((parseFloat(withdrawAmountUSD) || 0) * 133).toLocaleString()}
                      </span>
                    </div>

                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-emerald-400 font-bold text-xs">$</span>
                      <input
                        type="number"
                        step="0.50"
                        min="5.00"
                        max={balanceUSD}
                        required
                        value={withdrawAmountUSD}
                        onChange={(e) => setWithdrawAmountUSD(e.target.value)}
                        className="w-full pl-8 pr-16 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-black text-amber-300 font-mono"
                      />
                      <span className="absolute right-3.5 top-2.5 text-slate-400 font-bold text-xs">USD</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-emerald-300 font-semibold">Minimum Transfer Allowed: $5.00 USD (NPR 665)</span>
                      <span>Max Balance: ${balanceUSD.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wide"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm Real Transfer (${withdrawAmountUSD} USD / NPR {Math.round((parseFloat(withdrawAmountUSD) || 0) * 133).toLocaleString()})</span>
                  </button>

                </form>
              )}
            </div>
          )}

          {activeTab === 'wallets' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Supported Nepal Payment Gateways & Banking Partners
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {DIGITAL_WALLETS.map((w) => (
                  <div key={w.id} className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{w.icon}</span>
                      <div>
                        <h4 className="font-extrabold text-white">{w.name}</h4>
                        <span className="text-[10px] text-emerald-400 font-bold">Instant Transfer Enabled</span>
                      </div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">Verified</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase">Commercial Banks in Nepal (A-Class)</h4>
                <div className="flex flex-wrap gap-1.5">
                  {NEPAL_BANKS.map((bank) => (
                    <span key={bank} className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg text-[11px] font-medium border border-slate-800">
                      🏛️ {bank}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Past Transfer Log
              </h3>

              <div className="space-y-2">
                {payoutHistory.map((txn) => (
                  <div key={txn.id} className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{txn.id}</span>
                        <span className="text-slate-400">• {txn.date}</span>
                      </div>
                      <p className="text-slate-300 mt-0.5 font-medium">{txn.method} ({txn.recipient})</p>
                    </div>

                    <div className="text-right">
                      <span className="text-emerald-400 font-black font-mono block text-sm">
                        NPR {txn.amountNPR.toLocaleString()}
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CEO Arjun Singh Ghatang Portal Payout System</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
