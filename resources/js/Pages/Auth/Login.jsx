import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            <Head title="Login" />

            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#1e1b4b]" />

            {/* FLOATING ORBS */}
            <div className="orb orb1" />
            <div className="orb orb2" />
            <div className="orb orb3" />

            {/* CARD */}
            <div className="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-white animate-fadeIn">

                <h1 className="text-2xl font-semibold text-center mb-6 tracking-wider">
                    LOGIN
                </h1>

                {status && (
                    <div className="mb-4 text-sm text-green-400 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">

                    <div className="input-glow">
                        <InputLabel htmlFor="email" value="Email" className="text-white/80" />

                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            className="mt-1 block w-full bg-white/20 border-white/30 text-white rounded-lg focus:ring-0"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="input-glow">
                        <InputLabel htmlFor="password" value="Password" className="text-white/80" />

                        <TextInput
                            id="password"
                            type="password"
                            value={data.password}
                            className="mt-1 block w-full bg-white/20 border-white/30 text-white rounded-lg focus:ring-0"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div className="flex justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <Checkbox
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="text-white/70">Remember</span>
                        </label>

                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-white/70 hover:text-white">
                                Forgot?
                            </Link>
                        )}
                    </div>

                    <PrimaryButton className="w-full justify-center mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition">
                        Sign In
                    </PrimaryButton>

                </form>

            </div>

        </div>
    );
}