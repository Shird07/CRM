import { Head, Link, useForm } from '@inertiajs/react'

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/register')
    }

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2c3e50] to-[#8e44ad]">

                <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[400px]">

                    <h2 className="text-2xl font-bold text-center mb-2">
                        Daftar Akun
                    </h2>

                    <p className="text-center text-gray-500 mb-6">
                        Buat akun baru untuk mulai
                    </p>

                    <form onSubmit={submit} className="space-y-4">

                        {/* NAME */}
                        <div>
                            <input
                                type="text"
                                placeholder="Masukkan nama"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

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

                        {/* CONFIRM */}
                        <div>
                            <input
                                type="password"
                                placeholder="Ulangi password"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            disabled={processing}
                            className="w-full py-3 rounded-lg text-white font-semibold 
                            bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
                        >
                            Daftar
                        </button>

                    </form>

                    <p className="text-center text-sm mt-5">
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-purple-600 font-semibold">
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}