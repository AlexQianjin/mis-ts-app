import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Box,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Command,
  CreditCard,
  LayoutDashboard,
  Menu,
  Moon,
  MoreHorizontal,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Sun,
  Users,
  WalletCards,
  X,
} from 'lucide-react';

import { authClient } from '../lib/auth';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Customers', icon: Users },
  { label: 'Products', icon: Package },
  { label: 'Orders', icon: ShoppingBag, badge: '12' },
  { label: 'Payments', icon: CreditCard },
];

const sales = [36, 66, 48, 78, 55, 71, 48, 62, 88, 70, 92, 74];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const orders = [
  { initials: 'AW', tint: 'bg-[#fff4e7] text-[#df8120]', name: 'Apple Watch Series 9', id: '#NV-1048', price: '$699.00', status: 'Delivered' },
  { initials: 'MB', tint: 'bg-[#eef2ff] text-[#5668de]', name: 'MacBook Air M3', id: '#NV-1047', price: '$1,499.00', status: 'Processing' },
  { initials: 'SP', tint: 'bg-[#eaf9f2] text-[#2d9d70]', name: 'Sony WH-1000XM5', id: '#NV-1046', price: '$399.00', status: 'Delivered' },
  { initials: 'IP', tint: 'bg-[#f6efff] text-[#8a5bc5]', name: 'iPhone 15 Pro', id: '#NV-1045', price: '$1,199.00', status: 'Cancelled' },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-9 place-items-center rounded-xl bg-[#545ee8] text-white shadow-[0_8px_20px_rgba(84,94,232,.28)]">
        <Sparkles size={18} strokeWidth={2.5} />
      </div>
      <span className="text-[21px] font-bold tracking-[-0.04em] text-[#171b31]">Nexora</span>
    </div>
  );
}

function StatCard({ title, value, change, positive, icon: Icon }: { title: string; value: string; change: string; positive: boolean; icon: typeof Users }) {
  return (
    <article className="rounded-2xl border border-[#e8eaf1] bg-white p-5 shadow-[0_1px_2px_rgba(18,22,42,.02)]">
      <div className="mb-5 flex items-start justify-between">
        <div className="grid size-11 place-items-center rounded-xl bg-[#f4f5f9] text-[#474c5f]"><Icon size={20} /></div>
        <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${positive ? 'bg-[#ecfaf3] text-[#239666]' : 'bg-[#fff1f1] text-[#d75555]'}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{change}
        </span>
      </div>
      <p className="text-sm text-[#73788c]">{title}</p>
      <p className="mt-1 text-[26px] font-bold tracking-[-0.04em] text-[#171b31]">{value}</p>
    </article>
  );
}

function SalesChart() {
  return (
    <div className="mt-7 flex h-[190px] gap-3">
      <div className="flex flex-col justify-between pb-6 text-[11px] text-[#9a9eae]"><span>$80k</span><span>$60k</span><span>$40k</span><span>$20k</span><span>$0</span></div>
      <div className="relative flex flex-1 items-end justify-between border-b border-[#e8eaf1] pb-6">
        {[0, 1, 2, 3].map((line) => <div key={line} className="absolute inset-x-0 border-t border-dashed border-[#eceef4]" style={{ bottom: `${24 + line * 39}px` }} />)}
        {sales.map((height, index) => (
          <div key={months[index]} className="relative z-10 flex h-full flex-1 flex-col items-center justify-end gap-2">
            <div className="group relative flex h-[145px] items-end">
              <div className="w-[clamp(8px,1.15vw,14px)] rounded-t-[5px] bg-[#5964e8] transition hover:bg-[#404bd3]" style={{ height: `${height}%` }} />
            </div>
            <span className="text-[10px] text-[#8b90a3]">{months[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function App() {
  const queryClient = useQueryClient();
  const [mobileNav, setMobileNav] = useState(false);
  const [dark, setDark] = useState(false);
  const [range, setRange] = useState('Monthly');
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState('');

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    setSignOutError('');

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setSignOutError(result.error.message || 'Unable to sign out. Please try again.');
        setIsSigningOut(false);
        return;
      }

      queryClient.clear();
      window.location.assign('/login');
    } catch {
      setSignOutError('Unable to reach the authentication service. Please try again.');
      setIsSigningOut(false);
    }
  };

  return (
    <div className={dark ? 'dark-dashboard' : ''}>
      <div className="min-h-screen bg-[#f7f8fc] text-[#252a3d] lg:pl-[248px]">
        {mobileNav && <button aria-label="Close menu backdrop" className="fixed inset-0 z-40 bg-[#11152b]/30 lg:hidden" onClick={() => setMobileNav(false)} />}
        <aside className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col border-r border-[#e7e9f1] bg-white px-4 py-5 transition-transform lg:translate-x-0 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between px-2 pb-8">
            <Logo />
            <button aria-label="Close menu" className="rounded-lg p-2 text-[#777c8f] hover:bg-[#f4f5f9] lg:hidden" onClick={() => setMobileNav(false)}><X size={19} /></button>
          </div>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#a4a8b7]">Workspace</p>
          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon, badge }, index) => (
              <button key={label} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${index === 0 ? 'bg-[#eef0ff] text-[#4f59df]' : 'text-[#687084] hover:bg-[#f6f7fa] hover:text-[#252a3d]'}`}>
                <Icon size={18} strokeWidth={index === 0 ? 2.4 : 2} /><span>{label}</span>
                {badge && <span className="ml-auto rounded-md bg-[#f0f1f5] px-2 py-0.5 text-[10px] font-semibold text-[#74798c]">{badge}</span>}
              </button>
            ))}
          </nav>
          <p className="mb-2 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#a4a8b7]">Manage</p>
          <nav className="space-y-1">
            {[{ label: 'Reports', icon: WalletCards }, { label: 'Settings', icon: Settings }, { label: 'Help Center', icon: CircleHelp }].map(({ label, icon: Icon }) => (
              <button key={label} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#687084] transition hover:bg-[#f6f7fa] hover:text-[#252a3d]"><Icon size={18} />{label}</button>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl bg-[#171b31] p-4 text-white">
            <div className="mb-3 grid size-8 place-items-center rounded-lg bg-white/10"><Sparkles size={16} /></div>
            <p className="text-sm font-semibold">Unlock more insights</p>
            <p className="mt-1 text-[11px] leading-4 text-white/55">Get advanced reports and forecasting tools.</p>
            <button className="mt-4 w-full rounded-lg bg-white py-2 text-xs font-semibold text-[#20243a] hover:bg-[#f2f2f6]">Upgrade plan</button>
          </div>
        </aside>

        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-[#e7e9f1] bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <button aria-label="Open menu" className="mr-3 rounded-xl border border-[#e7e9f1] p-2.5 text-[#60667a] lg:hidden" onClick={() => setMobileNav(true)}><Menu size={19} /></button>
          <label className="hidden w-full max-w-[380px] items-center gap-3 rounded-xl border border-[#e7e9f1] bg-[#fafbfc] px-3.5 py-2.5 sm:flex">
            <Search size={17} className="text-[#8a8fa1]" /><input aria-label="Search" className="w-full bg-transparent text-sm outline-none placeholder:text-[#a3a7b6]" placeholder="Search anything..." />
            <span className="flex items-center gap-1 rounded-md border border-[#e5e7ee] bg-white px-1.5 py-0.5 text-[10px] text-[#8b90a2]"><Command size={10} />K</span>
          </label>
          <div className="ml-auto flex items-center gap-2">
            <button aria-label="Toggle color theme" className="grid size-10 place-items-center rounded-xl border border-[#e7e9f1] text-[#656b7f] hover:bg-[#f7f8fb]" onClick={() => setDark((value) => !value)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button aria-label="Notifications" className="relative grid size-10 place-items-center rounded-xl border border-[#e7e9f1] text-[#656b7f] hover:bg-[#f7f8fb]"><Bell size={18} /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#f47b55] ring-2 ring-white" /></button>
            <div className="relative ml-1">
              <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-[#f7f8fb]" onClick={() => setProfileOpen((value) => !value)}>
                <div className="grid size-8 place-items-center rounded-full bg-[#d9defc] text-xs font-bold text-[#4d56ca]">AQ</div>
                <span className="hidden text-left sm:block"><span className="block text-xs font-semibold text-[#272c40]">Alex Qin</span><span className="block text-[10px] text-[#9296a7]">Administrator</span></span>
                <ChevronDown size={14} className="text-[#818698]" />
              </button>
              {profileOpen && <div className="absolute right-0 top-12 w-52 rounded-xl border border-[#e6e8ef] bg-white p-1.5 text-sm shadow-[0_12px_35px_rgba(29,33,53,.12)]"><button className="w-full rounded-lg px-3 py-2 text-left hover:bg-[#f5f6fa]">My profile</button><button className="w-full rounded-lg px-3 py-2 text-left hover:bg-[#f5f6fa] disabled:cursor-wait disabled:opacity-60" disabled={isSigningOut} onClick={() => void handleSignOut()}>{isSigningOut ? 'Signing out…' : 'Sign out'}</button>{signOutError && <p className="mx-1 mt-1 rounded-lg bg-[#fff0f0] px-2 py-2 text-[11px] leading-4 text-[#b43e3e]" role="alert">{signOutError}</p>}</div>}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="text-sm text-[#868b9d]">Welcome back, Alex</p><h1 className="mt-1 text-[26px] font-bold tracking-[-0.04em] text-[#171b31]">Dashboard overview</h1></div>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-[#545ee8] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(84,94,232,.18)] hover:bg-[#454fdb]"><span className="text-lg leading-none">+</span> Add new product</button>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total customers" value="24,892" change="11.01%" positive icon={Users} />
            <StatCard title="Total orders" value="8,549" change="7.32%" positive icon={ShoppingBag} />
            <StatCard title="Total revenue" value="$89,240" change="2.14%" positive={false} icon={CreditCard} />
            <StatCard title="Active products" value="1,287" change="5.46%" positive icon={Box} />
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.8fr]">
            <article className="rounded-2xl border border-[#e8eaf1] bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><h2 className="font-bold text-[#1f2438]">Revenue overview</h2><p className="mt-1 text-xs text-[#8b90a2]">Your revenue performance this year</p></div>
                <div className="flex rounded-xl bg-[#f3f4f8] p-1">{['Monthly', 'Quarterly', 'Yearly'].map((item) => <button key={item} className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition ${range === item ? 'bg-white text-[#282d41] shadow-sm' : 'text-[#8a8fa1]'}`} onClick={() => setRange(item)}>{item}</button>)}</div>
              </div>
              <SalesChart />
            </article>

            <article className="overflow-hidden rounded-2xl border border-[#e8eaf1] bg-white">
              <div className="flex items-start justify-between p-5 pb-0 sm:p-6 sm:pb-0"><div><h2 className="font-bold text-[#1f2438]">Monthly target</h2><p className="mt-1 text-xs text-[#8b90a2]">Progress for August</p></div><button aria-label="More options" className="text-[#999dad]"><MoreHorizontal size={19} /></button></div>
              <div className="relative mx-auto mt-5 grid h-[150px] w-[250px] place-items-center overflow-hidden">
                <svg viewBox="0 0 220 130" className="absolute inset-0 size-full" aria-hidden="true"><path d="M25 110 A85 85 0 0 1 195 110" fill="none" stroke="#eff0f5" strokeWidth="14" strokeLinecap="round"/><path d="M25 110 A85 85 0 0 1 195 110" fill="none" stroke="#5964e8" strokeWidth="14" strokeLinecap="round" pathLength="100" strokeDasharray="76 100"/></svg>
                <div className="mt-10 text-center"><p className="text-[30px] font-bold tracking-[-0.04em] text-[#171b31]">76.4%</p><span className="rounded-full bg-[#ecfaf3] px-2 py-1 text-[10px] font-semibold text-[#249667]">+10.2%</span></div>
              </div>
              <p className="mx-auto -mt-1 max-w-[290px] px-4 text-center text-xs leading-5 text-[#7d8294]">You earned <strong className="text-[#3b4053]">$24,680</strong> this month. Keep up the great work!</p>
              <div className="mt-6 grid grid-cols-3 divide-x divide-[#e7e9ef] bg-[#f8f9fb] px-3 py-4 text-center"><div><p className="text-[10px] text-[#8c91a2]">Target</p><p className="mt-1 text-sm font-bold">$32K</p></div><div><p className="text-[10px] text-[#8c91a2]">Revenue</p><p className="mt-1 text-sm font-bold">$24.6K</p></div><div><p className="text-[10px] text-[#8c91a2]">Today</p><p className="mt-1 text-sm font-bold">$1.2K</p></div></div>
            </article>
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.8fr]">
            <article className="overflow-hidden rounded-2xl border border-[#e8eaf1] bg-white">
              <div className="flex items-center justify-between p-5 sm:px-6"><div><h2 className="font-bold text-[#1f2438]">Recent orders</h2><p className="mt-1 text-xs text-[#8b90a2]">Latest purchases from your store</p></div><button className="flex items-center gap-1 text-xs font-semibold text-[#555fe0]">View all <ChevronRight size={14} /></button></div>
              <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left"><thead className="border-y border-[#eceef3] bg-[#fafbfc] text-[10px] uppercase tracking-wider text-[#9296a6]"><tr><th className="px-6 py-3 font-semibold">Product</th><th className="px-4 py-3 font-semibold">Order ID</th><th className="px-4 py-3 font-semibold">Price</th><th className="px-4 py-3 font-semibold">Status</th></tr></thead><tbody className="divide-y divide-[#eff0f4]">{orders.map((order) => <tr key={order.id} className="text-xs hover:bg-[#fafbfc]"><td className="flex items-center gap-3 px-6 py-3"><div className={`grid size-9 place-items-center rounded-lg text-[10px] font-bold ${order.tint}`}>{order.initials}</div><span className="font-semibold text-[#363b4e]">{order.name}</span></td><td className="px-4 py-3 text-[#878c9e]">{order.id}</td><td className="px-4 py-3 font-semibold text-[#42475a]">{order.price}</td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${order.status === 'Delivered' ? 'bg-[#ecfaf3] text-[#259568]' : order.status === 'Processing' ? 'bg-[#fff7e7] text-[#c9871a]' : 'bg-[#fff0f0] text-[#d45c5c]'}`}>{order.status}</span></td></tr>)}</tbody></table></div>
            </article>

            <article className="rounded-2xl border border-[#e8eaf1] bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between"><div><h2 className="font-bold text-[#1f2438]">Top countries</h2><p className="mt-1 text-xs text-[#8b90a2]">Customers by location</p></div><button aria-label="More options" className="text-[#999dad]"><MoreHorizontal size={19} /></button></div>
              <div className="my-7 grid h-[125px] place-items-center rounded-2xl bg-[#f5f7fb]">
                <div className="relative h-[78px] w-[205px] opacity-80"><span className="absolute left-3 top-7 h-5 w-12 rounded-[50%] bg-[#ccd2e7]"/><span className="absolute left-12 top-3 h-8 w-14 rotate-[-12deg] rounded-[45%] bg-[#b8c0dc]"/><span className="absolute left-[92px] top-9 h-6 w-8 rounded-[45%] bg-[#545ee8]"/><span className="absolute right-5 top-4 h-8 w-16 rotate-6 rounded-[45%] bg-[#d6daea]"/></div>
              </div>
              <div className="space-y-4">{[['United States', '12,480', '68%', 'bg-[#5964e8]'], ['United Kingdom', '4,290', '24%', 'bg-[#aab0d9]'], ['Germany', '1,576', '8%', 'bg-[#daddea]']].map(([country, count, share, color]) => <div key={country}><div className="mb-1.5 flex items-center text-xs"><span className="font-medium text-[#4a4f61]">{country}</span><span className="ml-auto text-[#9599a9]">{count}</span><span className="ml-4 w-8 text-right font-semibold text-[#484d61]">{share}</span></div><div className="h-1.5 rounded-full bg-[#eff0f4]"><div className={`h-full rounded-full ${color}`} style={{ width: share }} /></div></div>)}</div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
