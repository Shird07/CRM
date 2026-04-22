import { Head, Link, useForm } from '@inertiajs/react'

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/login')
    }

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2c3e50] to-[#8e44ad]">

                <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[380px]">

                    <h2 className="text-2xl font-bold text-center mb-2">
                        Welcome Back
                    </h2>

                    <p className="text-center text-gray-500 mb-6">
                        Login untuk melanjutkan
                    </p>

                    <form onSubmit={submit} className="space-y-4">

                        {/* EMAIL */}
                        <div>
                            <input
                                type="email"
                                placeholder="Masukkan email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <input
                                type="password"
                                placeholder="Masukkan password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>
                        
                        <div className="flex justify-between text-sm mt-2">
                            <span></span>

                            <Link href="/forgot-password" className="text-purple-500 hover:underline">
                                Lupa password?
                            </Link>
                        </div>

                        {/* BUTTON */}
                        <button
                            disabled={processing}
                            className="w-full py-3 rounded-lg text-white font-semibold 
                            bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center text-sm mt-5">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-purple-600 font-semibold">
                            Daftar
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}