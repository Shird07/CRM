import { useState, useEffect, useId } from 'react';
import { usePage, router } from '@inertiajs/react';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/Components/ui/popover';
import { Button } from '@/Components/ui/button';
import { Switch } from '@/Components/ui/switch';
import { User, Settings, LogOut, Bell, Sun, Moon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getRoleColor(role) {
  const colors = {
    admin: 'from-blue-400 to-indigo-500',
    sales: 'from-purple-400 to-pink-500',
    default: 'from-gray-400 to-gray-500',
  };
  return colors[role?.toLowerCase()] || colors.default;
}

function ThemeToggle() {
  const id = useId();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark =
      document.documentElement.classList.contains('dark') ||
      localStorage.getItem('theme') === 'dark';
    setIsDark(dark);
  }, []);

  const setTheme = (dark) => {
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800/80">
      <div className="flex min-w-0 items-center gap-2.5">
        {isDark ? (
          <Moon className="h-4 w-4 shrink-0 text-indigo-500" />
        ) : (
          <Sun className="h-4 w-4 shrink-0 text-amber-500" />
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 dark:text-zinc-100">
            Tema
          </p>
          <p className="text-[11px] text-gray-500 dark:text-zinc-400">
            {isDark ? 'Mode gelap' : 'Mode terang'}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Sun className="h-3.5 w-3.5 text-gray-400" aria-hidden />
        <Switch
          id={id}
          checked={isDark}
          onCheckedChange={setTheme}
          aria-label="Alihkan tema gelap atau terang"
        />
        <Moon className="h-3.5 w-3.5 text-gray-400" aria-hidden />
      </div>
    </div>
  );
}

function MenuItem({ icon: Icon, label, hint, onClick, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50 dark:text-zinc-200 dark:hover:bg-zinc-800/80"
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0 text-gray-400" />
        <span className="min-w-0">
          <span className="block font-medium">{label}</span>
          {hint && (
            <span className="block text-[11px] text-gray-500 dark:text-zinc-400">
              {hint}
            </span>
          )}
        </span>
      </span>
      {badge && (
        <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500 ring-2 ring-white dark:ring-zinc-900" />
      )}
    </button>
  );
}

export default function ProfileButton({ showName = false }) {
  const { auth } = usePage().props;
  const user = auth.user;
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    router.post(route('logout'));
  };

  const go = (url) => {
    setOpen(false);
    router.get(url);
  };

  const notificationsUrl =
    user.role === 'sales' ? route('sales.followup') : '/admin';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {showName && (
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-gray-700 dark:text-zinc-200">
                {user.name}
              </p>
              <p className="text-[10px] capitalize text-gray-400">
                {user.role || 'User'}
              </p>
            </div>
          )}
          <Avatar className="h-9 w-9 shadow-sm ring-2 ring-white dark:ring-zinc-800">
            <AvatarImage src={user.avatar || ''} alt={user.name} />
            <AvatarFallback
              className={`bg-gradient-to-br ${getRoleColor(user.role)} text-sm font-bold text-white`}
            >
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 overflow-hidden rounded-xl border-gray-200 p-0 shadow-lg dark:border-zinc-800"
        align="end"
        sideOffset={10}
      >
        <PopoverHeader className="border-b border-gray-100 bg-gray-50/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11">
              <AvatarImage src={user.avatar || ''} alt={user.name} />
              <AvatarFallback
                className={`bg-gradient-to-br ${getRoleColor(user.role)} text-sm font-bold text-white`}
              >
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <PopoverTitle className="truncate text-sm font-semibold text-gray-900 dark:text-zinc-100">
                {user.name}
              </PopoverTitle>
              <PopoverDescription className="truncate text-xs text-gray-500 dark:text-zinc-400">
                {user.email}
              </PopoverDescription>
              <PopoverDescription className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {user.role || 'User'}
              </PopoverDescription>
            </div>
          </div>
        </PopoverHeader>

        <PopoverBody className="space-y-0.5 p-2">
          <MenuItem
            icon={User}
            label="Profil"
            hint="Edit profil"
            onClick={() => go(route('profile.edit'))}
          />
          <MenuItem
            icon={Bell}
            label="Notifikasi"
            hint="Pengingat & aktivitas"
            badge
            onClick={() => go(notificationsUrl)}
          />
          <ThemeToggle />
          <MenuItem
            icon={Settings}
            label="Pengaturan"
            hint="Akun & keamanan"
            onClick={() => go(route('profile.edit'))}
          />
        </PopoverBody>

        <PopoverFooter className="border-t border-gray-100 bg-gray-50/50 p-2 dark:border-zinc-800 dark:bg-zinc-900/30">
          <Button
            variant="outline"
            className="h-9 w-full border-red-200 bg-white text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:bg-transparent dark:hover:bg-red-950/40"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
