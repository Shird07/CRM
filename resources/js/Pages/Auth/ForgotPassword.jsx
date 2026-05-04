import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword() {

    const { data, setData, post } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            <Head title="Forgot Password" />

            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#312e81] to-[#1e1b4b]" />

            <div className="orb orb1" />
            <div className="orb orb2" />

            <div className="relative w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 text-white">

                <h1 className="text-xl font-semibold text-center mb-6">
                    Reset Password
                </h1>

                <form onSubmit={submit} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full p-3 rounded bg-white/20"
                    />

                    <button className="w-full bg-purple-600 p-3 rounded">
                        Send Reset Link
                    </button>

                </form>

            </div>

        </div>
    );
}